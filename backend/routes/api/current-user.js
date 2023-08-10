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

    const userBookings = await User.findByPk(thisUser, {
      include: {
        model: Booking,
        include: {
          model: Spot,
          include: {
            model: Spot_Image,
            where: { preview: true },
            attributes: ["url"],
          },
        },
      },
      attributes: [],
    });

    const formatBookings = userBookings.Bookings.map((booking) => ({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.Spot_Images[0].url, 
      },
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }));

    res.json({ Bookings: formatBookings });
  }
});

//Sign out the current-user
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
