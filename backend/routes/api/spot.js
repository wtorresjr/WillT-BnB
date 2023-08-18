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
router.get("/", async (req, res, next) => {
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
router.get("/current-user", async (req, res, next) => {
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

    res.json({ Spots: Spots });
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//GET REVIEWS BY SPOT ID
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;
  const spotReview = await Spot.findByPk(spotId, {
    include: {
      model: Review,
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Review_Image, attributes: ["id", "url"] },
      ],
    },
    attributes: [],
  });

  if (spotReview) {
    res.status(200).json(spotReview);
  } else {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

//GET BOOKINGS FOR SPOT BY ID WITH OWNERSHIP VIEWS
router.get("/:spotId/bookings", async (req, res, next) => {
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
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//GET A SPOT BY ID
router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;
  try {
    const chosenSpot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
          required: false,
        },
        {
          model: Spot_Image,
          separate: true,
          required: false,
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          required: false,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (chosenSpot) {
      if (chosenSpot.Reviews && chosenSpot.Reviews.length > 0) {
        const reviewCount = chosenSpot.Reviews.length;
        const totalStars = chosenSpot.Reviews.reduce(
          (sum, review) => sum + review.stars,
          0
        );

        chosenSpot.setDataValue("numReviews", reviewCount);
        chosenSpot.setDataValue("avgStarRating", totalStars / reviewCount);
        delete chosenSpot.dataValues.Reviews;
      } else {
        chosenSpot.setDataValue("numReviews", "0");
        chosenSpot.setDataValue("avgStarRating", "No reviews yet");
        delete chosenSpot.dataValues.Reviews;
      }

      const spotImages = chosenSpot.Spot_Images;
      const owner = chosenSpot.User;
      delete chosenSpot.dataValues.User;
      delete chosenSpot.dataValues.Spot_Images;
      chosenSpot.setDataValue("SpotImages", spotImages);
      chosenSpot.setDataValue("Owner", owner);
      return res.status(200).json(chosenSpot);
    } else {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
  } catch (err) {
    res.json(err);
  }
});

//EDIT A SPOT
router.put("/:spotId", async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const { spotId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    const spotToEdit = await Spot.findByPk(spotId);
    if (spotToEdit) {
      if (spotToEdit.ownerId === thisUser) {
        address !== undefined ? (spotToEdit.address = address) : undefined;
        city !== undefined ? (spotToEdit.city = city) : undefined;
        state !== undefined ? (spotToEdit.state = state) : undefined;
        country !== undefined ? (spotToEdit.country = country) : undefined;
        lat !== undefined ? (spotToEdit.lat = lat) : undefined;
        lng !== undefined ? (spotToEdit.lng = lng) : undefined;
        name !== undefined ? (spotToEdit.name = name) : undefined;
        description !== undefined
          ? (spotToEdit.description = description)
          : undefined;
        price !== undefined ? (spotToEdit.price = price) : undefined;

        try {
          if (Object.keys(req.body).length === 0) {
            spotToEdit.address = "";
            spotToEdit.city = "";
            spotToEdit.state = "";
            spotToEdit.country = "";
            spotToEdit.lat = "";
            spotToEdit.lng = "";
            spotToEdit.name = "";
            spotToEdit.description = "";
            spotToEdit.price = "";
            await spotToEdit.save();
          }
          await spotToEdit.save();
          res.status(200).json(spotToEdit);
        } catch (err) {
          const errors = {};
          err.errors.map((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).json({ message: "Bad Request", errors });
        }
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
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
        next({ message: "Forbidden" });
      }
    } else {
      res.status(404);
      next({ message: "Spot couldn't be found" });
    }
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//CREATE A SPOT
router.post("/", async (req, res, next) => {
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
    } else {
      const error = new Error("Authentication required");
      error.status = 401;
      next(error);
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
router.post("/:spotId/reviews", async (req, res, next) => {
  const { review, stars } = req.body;
  const { spotId } = req.params;

  try {
    if (req.user) {
      const thisUser = req.user.id;
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
            .status(500)
            .json({ message: "User already has a review for this spot" });
        }

        const newReview = await Review.create({
          spotId: parseInt(spotId),
          userId: parseInt(thisUser),
          review: review,
          stars: stars,
        });

        return res.status(201).json(newReview);
      } else {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
    } else {
      const error = new Error("Authentication required");
      error.status = 401;
      next(error);
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
router.post("/:spotId/spot-images", async (req, res, next) => {
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
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//DELETE IMAGE FROM SPOT BY ID
router.delete("/:spotId/spot-images/:imageId", async (req, res, next) => {
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
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

//DELETE A SPOT
router.delete("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    const getSpot = await Spot.findOne({ where: { id: spotId } });

    if (getSpot) {
      if (getSpot.ownerId === thisUser) {
        await getSpot.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } else {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    next(error);
  }
});

router.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message: message });
});

module.exports = router;
