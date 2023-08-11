const express = require("express");
const router = express.Router();

const { Sequelize } = require("sequelize");

const {
  Spot,
  Booking,
  User,
  Review,
  Review_Image,
  Spot_Image,
} = require("../../db/models");

//Get all spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({
    include: [
      { model: Spot_Image, where: { preview: true } },
      {
        model: Review,
        attributes: [
          [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
        ],
      },
    ],
    group: "Spot.id",
  });
  res.json(allSpots);
});

//Get spots owned by current-user

router.get("/current-user", async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const Spots = await Spot.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: Review,
          required: false,
        },
        {
          model: Spot_Image,
          required: false,
          where: { preview: true },
          attributes: ["url"],
        },
      ],
    });

    Spots.forEach((spot) => {
      const reviews = spot.Reviews;
      if (reviews && reviews.length > 0) {
        const totalStars = reviews.reduce(
          (sum, review) => sum + review.stars,
          0
        );
        spot.setDataValue("avgRating", totalStars / reviews.length);
      } else {
        spot.setDataValue("avgRating", []);
      }
    });

    res.json(Spots);
  }
});

//Get reviews by spotId
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;
  const spotReview = await Spot.findByPk(spotId, {
    include: {
      model: Review,
      include: [
        { model: User },
        { model: Review_Image, attributes: ["id", "url"] },
      ],
    },
    attributes: [],
  });

  if (spotReview) {
    res.json(spotReview);
  } else {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

//Get bookings by spotId with permissions based on user ownership
router.get("/:spotId/bookings", async (req, res) => {
  if (req.user) {
    const { spotId } = req.params;
    const loggedInUserId = req.user.id;

    const spotBookings = await Spot.findByPk(spotId, {
      include: { model: Booking, include: { model: User } },
      attributes: ["ownerId"],
    });

    if (!spotBookings) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const bookingsResult = spotBookings.toJSON();

    if (spotBookings.ownerId === loggedInUserId) {
      delete bookingsResult.ownerId;
      return res.json(bookingsResult);
    } else {
      delete bookingsResult.ownerId;
      bookingsResult.Bookings.map((ele) => {
        delete ele.userId;
        delete ele.User;
      });

      return res.json(bookingsResult);
    }
  }
});

//Get spot by id
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const chosenSpot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Review,
        attributes: [
          [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
          [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
        ],
      },
      {
        model: Spot_Image,
        separate: true,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (chosenSpot.id !== null) {
    res.json(chosenSpot);
  } else {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

//Create a new booking for a spot
router.post("/:spotId/bookings", async (req, res, next) => {
  if (req.user) {
    const { startDate, endDate } = req.body;
    const thisUser = req.user.id;
    const { spotId } = req.params;

    const spotToBook = await Spot.findByPk(spotId, {
      include: { model: Booking, attributes: ["startDate", "endDate"] },
      attributes: ["ownerId"],
    });

    if (spotToBook) {
      if (thisUser !== spotToBook.ownerId) {
        let hasConflict = false;

        spotToBook.Bookings.forEach((booking) => {
          if (
            (startDate >= booking.startDate && startDate <= booking.endDate) ||
            (endDate >= booking.startDate && endDate <= booking.endDate)
          ) {
            hasConflict = true;
          }
        });

        if (hasConflict) {
          const errors = {};

          if (startDate === endDate) {
            errors.startDate =
              "Selected date conflicts with an existing booking";
          } else {
            if (startDate >= endDate) {
              errors.endDate = "endDate cannot be on or before startDate";
              res.status(400);
              return next({ message: "Bad Request", errors });
            } else {
              errors.startDate =
                "Start date conflicts with an existing booking";
              errors.endDate = "End date conflicts with an existing booking";
            }
          }

          res.status(403);
          return next({
            message:
              "Sorry, this spot is already booked for the specified dates",
            errors,
          });
        }

        const newBooking = await Booking.create({
          spotId: spotId,
          userId: thisUser,
          startDate: startDate,
          endDate: endDate,
        });

        res.json(newBooking);
      } else {
        res.status(403);
        next({ message: "This is the users spot" });
      }
    } else {
      console.log("not found");
      res.status(404);
      next({ message: "Spot couldn't be found" });
    }
  }
});

router.use((err, req, res, next) => {
  return res.send(err);
});

//Create a spot
router.post("/", async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (req.user) {
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });

    res.json(newSpot);
  }
});

module.exports = router;
