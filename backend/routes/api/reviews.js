const express = require("express");
const router = express.Router();

const {
  Review,
  User,
  Spot,
  Review_Image,
  Booking,
  Spot_Image,
} = require("../../db/models");

//CREATE REVIEW IMAGE FOR SPOT BY ID
router.post("/:reviewId/review-images", async (req, res) => {
  if (req.user) {
    const { url, preview } = req.body;
    const { reviewId } = req.params;
    const thisUser = req.user.id;

    const thisReview = await Review.findByPk(reviewId, {
      include: {
        model: Review_Image,
        as: "ReviewImages",
        required: false,
      },
    });

    if (thisReview) {
      if (thisReview.userId === thisUser) {
        const imageCount = thisReview.ReviewImages.length;
        if (imageCount < 10) {
          try {
            const newRevImage = await Review_Image.create({
              reviewId: reviewId,
              url: url,
            });
            return res.status(200).json({
              id: newRevImage.id,
              url: newRevImage.url,
            });
          } catch (err) {
            const errors = {};
            err.errors.map((err) => {
              errors[err.path] = err.message;
            });

            return res.status(400).json({ message: "Bad Request", errors });
          }
        } else {
          return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
          });
        }
      } else {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
    } else {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
  } else {
    return res.status(401).json({ message: "Authentication required" });
  }
});

//DELETE A REVIEW-IMAGE BY REVIEW-ID
router.delete("/:reviewId/review-images/:reviewImgId", async (req, res) => {
  const { reviewId, reviewImgId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    const thisReview = await Review.findByPk(reviewId, {
      include: { model: Review_Image },
    });
    if (thisReview) {
      if (thisReview.userId === thisUser) {
        const reviewImage = await Review_Image.findByPk(reviewImgId);
        if (reviewImage) {
          if (reviewImage.reviewId == reviewId) {
            await reviewImage.destroy();
            res.status(200).json({ message: "Successfully deleted" });
          } else {
            res.status(403).json({
              message: "Forbidden",
            });
          }
        } else {
          res.status(404).json({ message: "Review image couldn't be found" });
        }
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Review Id couldn't be found" });
    }
  } else {
    return res.status(401).json({ message: "Authentication required" });
  }
});

//DELETE A REVIEW BY REVIEW-ID
router.delete("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  if (req.user) {
    const thisUser = req.user.id;
    try {
      const reviewToDelete = await Review.findByPk(reviewId);
      if (reviewToDelete) {
        if (reviewToDelete.userId === thisUser) {
          await reviewToDelete.destroy();
          res.json({ message: "Successfully deleted" });
        } else {
          res.status(403).json({
            message: "Forbidden",
          });
        }
      } else {
        res.status(404).json({
          message: "Review couldn't be found",
        });
      }
    } catch (err) {
      const errors = {};
      err.errors.map((err) => {
        errors[err.path] = err.message;
      });
      res.json(errors);
    }
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
});

//EDIT A REVIEW
router.put("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  if (req.user) {
    const thisUser = req.user.id;
    const reviewToEdit = await Review.findByPk(reviewId);
    if (reviewToEdit) {
      if (reviewToEdit.userId === thisUser) {
        try {
          if (Object.keys(req.body).length === 0) {
            reviewToEdit.review = "";
            reviewToEdit.stars = "";
          }
          if (stars !== undefined) {
            reviewToEdit.stars = stars;
          }
          if (review !== undefined) {
            reviewToEdit.review = review;
          }
          await reviewToEdit.save();
          res.json(reviewToEdit);
        } catch (err) {
          const errors = {};
          err.errors.map((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).json({ message: "Bad Request", errors });
        }
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } else {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
  } else {
    return res.status(401).json({ message: "Authentication required" });
  }
});

module.exports = router;
