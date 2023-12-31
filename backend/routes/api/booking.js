const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const {
  Spot,
  Booking,
  User,
  Review,
  Review_Image,
  Spot_Image,
} = require("../../db/models");

router.delete("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    const bookingToDelete = await Booking.findByPk(bookingId, {
      include: { model: Spot },
    });

    if (bookingToDelete) {
      if (
        bookingToDelete.userId === thisUser ||
        bookingToDelete.Spot.ownerId === thisUser
      ) {
        const getDate = new Date().toJSON().split("T");
        todaysDate = getDate[0];

        if (todaysDate >= bookingToDelete.startDate) {
          return res.status(400).json({
            message: "Bookings that have been started can't be deleted",
          });
        } else {
          await bookingToDelete.destroy();
          return res.status(200).json({ message: "Successfully deleted" });
        }
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Booking couldn't be found" });
    }
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
});

router.put("/:bookingId", async (req, res) => {
  debugger;
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const errors = {};
  if (req.user) {
    const thisUser = req.user.id;

    const bookingToEdit = await Booking.findByPk(bookingId);

    if (bookingToEdit) {
      if (bookingToEdit.userId === thisUser) {
        const bookingsForSpot = await Booking.findAll({
          where: {
            spotId: bookingToEdit.spotId,
          },
        });

        const getDate = new Date().toJSON().split("T");
        todaysDate = getDate[0];

        if (
          bookingToEdit.endDate < todaysDate ||
          bookingToEdit.startDate < todaysDate
        ) {
          return res
            .status(400)
            .json({ message: "Past bookings can't be modified" });
        }

        //WRITE IF BLOCK FOR MISSING REQ.BODY, CHECK MODEL FOR EMPTY/ NULL VALIDATIONS

        startDate !== undefined
          ? (bookingToEdit.startDate = startDate)
          : undefined;
        endDate !== undefined ? (bookingToEdit.endDate = endDate) : undefined;

        try {
          if (!startDate && !endDate) {
            return res.status(403).json({
              message: "Bad Request",
              errors: {
                startDate: "Start date is required",
                endDate: "End date is required",
              },
            });
          }

          if (endDate || startDate) {
            let hasConflict = false;
            let isBadDate = false;

            bookingsForSpot.forEach((booking) => {
              if (
                startDate >= booking.startDate &&
                startDate <= booking.endDate &&
                booking.id !== bookingId &&
                booking.userId !== thisUser
              ) {
                errors.startDate =
                  "Start date conflicts with an existing booking";
                hasConflict = true;
              }

              if (
                endDate >= booking.startDate &&
                endDate <= booking.endDate &&
                booking.id !== bookingId &&
                booking.userId !== thisUser
              ) {
                errors.endDate = "End date conflicts with an existing booking";
                hasConflict = true;
              }

              if (
                startDate <= booking.startDate &&
                endDate >= booking.endDate &&
                booking.id !== bookingId &&
                booking.userId !== thisUser
              ) {
                errors.startDate =
                  "Start date conflicts with an existing booking";
                errors.endDate = "End date conflicts with an existing booking";
                hasConflict = true;
              }

              if (startDate >= endDate) {
                errors.endDate = "endDate cannot come before startDate";
                isBadDate = true;
              }

              if (isBadDate) {
                return res.status(400).json({ message: "Bad Request", errors });
              }

              if (hasConflict) {
                return res.status(403).json({
                  message:
                    "Sorry, this spot is already booked for the specified dates",
                  errors,
                });
              }
            });
          }
        } catch (err) {
          err.errors.map((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).json({ message: "Bad Request", errors });
        }

        await bookingToEdit.save();
        res.json(bookingToEdit);
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Booking couldn't be found" });
    }
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
});

module.exports = router;
