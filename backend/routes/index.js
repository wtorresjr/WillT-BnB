const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
const {
  Spot,
  Booking,
  User,
  Review,
  Review_Image,
  Spot_Image,
} = require("../db/models");

const { contentSecurityPolicy } = require("helmet");

router.use("/api", apiRouter);

// router.get("/hello/world", function (req, res) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.send("Hello World!");
// });
  router.get("/spots", async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
  });

router.get("/spots/:spotId", async (req, res) => {
  const { spotId } = req.params;
  console.log("Searching for", spotId);
  const chosenSpot = await Spot.findByPk(spotId, {
    include: [
      { model: Spot_Image },
      { model: Booking },
      { model: Review, include: { model: Review_Image } },
    ],
  });


  res.json(chosenSpot);
});

module.exports = router;
