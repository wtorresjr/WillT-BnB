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
    const bookingToDelete = await Booking.findByPk(bookingId);

    if (bookingToDelete) {
      if (bookingToDelete.userId === thisUser) {
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
        res
          .status(403)
          .json({ message: "Booking does not belong to current-user" });
      }
    } else {
      res.status(404).json({ message: "Booking couldn't be found" });
    }
  } else {
    res.status(403).json({ message: "Authentication Required" });
  }
});

router.put("/:bookingId", async (req, res) => {
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

        startDate !== undefined
          ? (bookingToEdit.startDate = startDate)
          : undefined;
        endDate !== undefined ? (bookingToEdit.endDate = endDate) : undefined;

        try {
          if (endDate || startDate) {
            let hasConflict = false;

            bookingsForSpot.forEach((booking) => {
              if (booking.startDate === startDate && booking.id !== bookingId) {
                errors.startDate =
                  "Start date conflicts with an existing booking";
                hasConflict = true;
              }
              if (booking.endDate === endDate && booking.id !== bookingId) {
                errors.endDate = "End date conflicts with an existing booking";
                hasConflict = true;
              }
              if (booking.startDate === endDate && booking.id !== bookingId) {
                errors.startDate =
                  "End date conflicts with an existing booking";
                hasConflict = true;
              }
              if (booking.endDate === startDate && booking.id !== bookingId) {
                errors.endDate =
                  "Start date conflicts with an existing booking";
                hasConflict = true;
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

          await bookingToEdit.save();
          res.json(bookingToEdit);
        } catch (err) {
          err.errors.map((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).json({ message: "Bad Request", errors });
        }
      } else {
        res
          .status(403)
          .json({ message: "Current user does not own this booking" });
      }
    } else {
      res.status(404).json({ message: "Booking couldn't be found" });
    }
  } else {
    res.status(403).json({ message: "Authentication required" });
  }
});

module.exports = router;
