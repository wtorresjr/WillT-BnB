const express = require("express");
const router = express.Router();

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

module.exports = router;
