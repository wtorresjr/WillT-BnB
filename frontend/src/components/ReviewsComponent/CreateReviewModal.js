import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";
import { useState, useEffect } from "react";
import { createNewReview } from "../../store/reviews";

const CreateReviewModal = ({ spotId, updateCount }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isCreating, setIsCreating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [starRating, setStarRating] = useState(1);
  const [newReview, setNewReview] = useState("");

  const currentSpot = useSelector((state) => state?.spots?.oneSpot);

  const createReview = async () => {
    // console.log("Users Review", newReview.toString());

    // console.log("Star Rating", +starRating);
    // console.log("Current Spot Id", currentSpot?.id);

    try {
      await dispatch(
        createNewReview(currentSpot?.id, {
          review: newReview,
          stars: +starRating,
        })
      );
      setIsCreating(true);
      closeModal();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  let notPickedStar = "fa-regular fa-star fa-2xl";
  let pickedStar = "fa-solid fa-star fa-2xl";

  useEffect(() => {
    newReview.length > 10 ? setIsDisabled(false) : setIsDisabled(true);
  }, [dispatch, newReview]);

  useEffect(() => {
    const allStars = document?.querySelectorAll(".starsContainer button");
    for (let star = 0; star < allStars.length; star++) {
      let starNode = allStars[star];
      let starValue = allStars[star].value;
      if (starValue <= +starRating) {
        starNode.setAttribute("class", pickedStar);
      } else if (starValue > +starRating) {
        starNode.setAttribute("class", notPickedStar);
      }
    }
  }, [starRating, pickedStar, notPickedStar]);

  useEffect(() => {
    dispatch(getReviews(currentSpot?.id));
    updateCount();
  }, [dispatch, isCreating, currentSpot?.id]);

  return (
    <div className="deleteSpotModal">
      <h3 style={{ margin: "10px 0", textAlign: "center" }}>
        How was your stay?
      </h3>
      <textarea
        id="reviewTextArea"
        rows={8}
        placeholder="Leave your review here..."
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      ></textarea>
      <div className="starsContainer">
        <button
          className="fa-regular fa-star fa-2xl"
          value={1}
          onClick={(e) => setStarRating(e.target.value)}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={2}
          onClick={(e) => setStarRating(e.target.value)}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={3}
          onClick={(e) => setStarRating(e.target.value)}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={4}
          onClick={(e) => setStarRating(e.target.value)}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={5}
          onClick={(e) => setStarRating(e.target.value)}
        ></button>
        <p>Stars</p>
      </div>
      <button onClick={createReview} id="submitReviewBtn" disabled={isDisabled}>
        Submit Your Review
      </button>
    </div>
  );
};

export default CreateReviewModal;
