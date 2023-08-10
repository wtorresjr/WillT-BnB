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
    // raw: true,
  });
  res.json(allSpots);
});

//Get spots owned by current-user

router.get("/current-user", async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const ownedSpots = await Spot.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: Review,
          attributes: [
            [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
          ],
        },
        {
          model: Spot_Image,
          where: { preview: true },
          attributes: ["url"],
        },
      ],
      // nest: true,
      raw: true,
    });

    res.json(ownedSpots);
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
