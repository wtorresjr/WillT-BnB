const express = require("express");
const router = express.Router();

const { Sequelize, Op } = require("sequelize");

const {
  Spot,
  Booking,
  User,
  Review,
  Review_Image,
  Spot_Image,
} = require("../../db/models");

//GET ALL SPOTS
router.get("/", async (req, res) => {
  try {
    const allSpots = await Spot.findAll({
      include: [
        { model: Review, required: false },
        {
          model: Spot_Image,
          required: false,
          where: { preview: true },
          attributes: ["url"],
        },
      ],
    });
    allSpots.forEach((spot) => {
      const reviews = spot.Reviews;

      if (reviews && reviews.length > 0) {
        const totalStars = reviews.reduce(
          (sum, review) => sum + review.stars,
          0
        );

        const avgRating = totalStars / reviews.length;

        spot.setDataValue("avgRating", avgRating);

        delete spot.dataValues.Reviews;
        if (spot.dataValues.Spot_Images && spot.dataValues.Spot_Images[0].url) {
          spot.setDataValue("previewImage", spot.dataValues.Spot_Images[0].url);
          // console.log("Spot images length", spot.dataValues.Spot_Images);
        } else {
          delete spot.dataValues.Spot_Images;
          spot.setDataValue("previewImage", "No spot images yet");
        }
        delete spot.dataValues.Spot_Images;
      } else {
        delete spot.dataValues.Reviews;
        spot.setDataValue("avgRating", "No reviews yet");
      }
    });

    res.json({ Spots: allSpots });
  } catch (err) {
    res.json(err);
  }
});

//GET SPOTS OWNED BY CURRENT-USER
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

//GET REVIEWS BY SPOT ID
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

//GET BOOKINGS FOR SPOT BY ID WITH OWNERSHIP VIEWS
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

//GET A SPOT BY ID
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

//CREATE A NEW BOOKING FOR SPOT BY ID
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
      res.status(404);
      next({ message: "Spot couldn't be found" });
    }
  }
});

router.use((err, req, res, next) => {
  return res.send(err);
});

//CREATE A SPOT
router.post("/", async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  try {
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
      return res.status(201).json(newSpot);
    }
  } catch (err) {
    const errors = {};

    err.errors.map((err) => {
      errors[err.path] = err.message;
    });
    return res.status(400).json({ message: "Bad Request", errors });
  }
});

//CREATE REVIEW FOR SPOT BY ID
router.post("/:spotId/reviews", async (req, res) => {
  const { review, stars } = req.body;
  const { spotId } = req.params;
  const thisUser = req.user.id;

  try {
    if (req.user) {
      const getSpot = await Spot.findByPk(spotId);

      if (getSpot) {
        const getReviews = await Review.findOne({
          where: {
            [Op.and]: {
              userId: thisUser,
              spotId: spotId,
            },
          },
        });

        if (getReviews) {
          return res
            .status(403)
            .json({ message: "User already has a review for this spot" });
        }

        const newReview = await Review.create({
          spotId: spotId,
          userId: thisUser,
          review: review,
          stars: stars,
        });

        return res.status(201).json({
          newReview,
        });
      } else {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
    } else {
      return res.json({ message: "Must be logged in to write a review" });
    }
  } catch (err) {
    const errors = {};
    err.errors.map((err) => {
      errors[err.path] = err.message;
    });

    return res.status(400).json({ message: "Bad Request", errors });
  }
});

//ADD AN IMAGE TO A SPOT BY ID
router.post("/:spotId/spot-images", async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  if (req.user) {
    const thisUser = req.user.id;

    const getSpot = await Spot.findOne({ where: { id: spotId } });

    if (getSpot) {
      if (getSpot.ownerId === thisUser) {
        try {
          const newImage = await Spot_Image.create({
            spotId: spotId,
            url: url,
            preview: preview,
          });
          res.status(200).json({
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview,
          });
        } catch (err) {
          const errors = {};
          err.errors.map((err) => {
            errors[err.path] = err.message;
          });

          return res.status(400).json({ message: "Bad Request", errors });
        }
      } else {
        res.status(403).json({ message: "Must own spot to add images" });
      }
    } else {
      res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    res.status(403).json({ message: "Must be logged in" });
  }
});

//DELETE IMAGE FROM SPOT BY ID
router.delete("/:spotId/spot-images/:imageId", async (req, res) => {
  const { spotId, imageId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    const spot = await Spot.findByPk(spotId, {
      include: { model: Spot_Image },
    });
    if (spot) {
      if (spot.ownerId === thisUser) {
        if (spot.Spot_Images.length) {
          const spotImageToDelete = await Spot_Image.findByPk(imageId);
          if (spotImageToDelete) {
            if (spotImageToDelete.spotId === spot.id) {
              await spotImageToDelete.destroy();
              res.status(200).json({ message: "Successfully deleted" });
            } else {
              res.status(403).json({
                message: "Provided imageId does not belong to this spot",
              });
            }
          } else {
            res.status(404).json({ message: "Spot_Image couldn't be found" });
          }

          res.json(spot.Spot_Images);
        } else {
          res
            .status(404)
            .json({ message: "No images have been loaded for this spot" });
        }
      } else {
        res.status(403).json({ message: "Current-user does not own spot" });
      }
    } else {
      res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    return res.status(403).json({ message: "Authentication Required" });
  }
});

//DELETE A SPOT
router.delete("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    const getSpot = await Spot.findOne({ where: { id: spotId } });

    if (getSpot) {
      if (getSpot.ownerId === thisUser) {
        await getSpot.destroy();
        return res.status(200).json({ message: "Successfully Deleted" });
      } else {
        return res
          .status(403)
          .json({ message: "Must own this spot to delete" });
      }
    } else {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
  }
});

module.exports = router;
