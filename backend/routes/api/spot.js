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
    // raw: true,
  });
  res.json(allSpots);
});

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
        limit: 25,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (chosenSpot.id !== null) {
    const modifiedSpot = {
      ...chosenSpot.toJSON(),
      Owner: chosenSpot.Owner,
    };

    delete modifiedSpot.Owner;

    modifiedSpot.Owner = chosenSpot.Owner;

    res.json(modifiedSpot);
  } else {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

module.exports = router;
