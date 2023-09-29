const express = require("express");
const router = express.Router();
// const { Op } = require("sequelize");

const {
  Review,
  User,
  Spot,
  Review_Image,
  Booking,
  Spot_Image,
} = require("../../db/models");

//GET CURRENT USER INFO
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

//GET CURRENT-USER REVIEWS
router.get("/reviews", async (req, res, next) => {
  if (req.user) {
    const thisUser = req.user.id;
    const Reviews = await Review.findAll({
      where: {
        userId: thisUser,
      },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        {
          model: Spot,
          attributes: { exclude: ["createdAt", "updatedAt", "description"] },
          include: {
            model: Spot_Image,
            where: { preview: true },
            attributes: ["url"],
          },
        },

        {
          model: Review_Image,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    Reviews.forEach((spot) => {
      // console.log(spot.Spot.Spot_Image);
      let spotImage = spot.Spot.Spot_Images[0].url;
      delete spot.Spot.dataValues.Spot_Images;
      spot.Spot.setDataValue("previewImage", spotImage);
    });
    res.status(200).json({ Reviews });
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//GET CURRENT-USER BOOKINGS
router.get("/bookings", async (req, res, next) => {
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
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }));

    return res.status(200).json({ Bookings: formatBookings });
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//SIGN OUT THE CURRENT-USER
router.delete("/", (_req, res, next) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

router.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message: message });
});

module.exports = router;
