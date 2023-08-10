const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const {
  Review,
  User,
  Spot,
  Review_Image,
  Booking,
  Spot_Image,
} = require("../../db/models");

//Get current-user data
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

//Get current-user reviews
router.get("/reviews", async (req, res) => {
  if (req.user) {
    const thisUser = req.user.id;
    const userReviews = await Review.findAll({
      where: {
        userId: thisUser,
      },
      include: [
        { model: User },
        {
          model: Spot,
          include: { model: Spot_Image, where: { preview: true } },
        },

        { model: Review_Image, attributes: ["id", "url"] },
      ],
    });
    res.json(userReviews);
  }
});

//Get current-users bookings

router.get("/bookings", async (req, res) => {
  if (req.user) {
    const thisUser = req.user.id;

    const userBookings = await Booking.findAll({
      where: { userId: thisUser },
      include: { model: Spot },
    });

    res.json(userBookings);
  }
});

//Sign out the current-user
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
