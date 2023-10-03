import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";
import { useState, useEffect } from "react";
import { createNewReview } from "../../store/reviews";

const CreateReviewModal = ({ spotId, updateCount, toggleReviewStatus }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isCreating, setIsCreating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [starRating, setStarRating] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();
  const [errors, setErrors] = useState({});

  const currentSpot = useSelector((state) => state?.spots?.oneSpot);

  const createReview = async () => {
    try { 
      const newReviewData = await dispatch(
        createNewReview(currentSpot?.id, {
          review: newReview,
          stars: +starRating,
        })
      );
      setIsCreating(true);
      toggleReviewStatus(true);
      closeModal();
    } catch (error) {
      if (error) {
        const theErrors = await error.json();
        setErrors(theErrors);
        // console.log(errors, "<======== Errors state");
      } else {
        console.error("unexpected error", error);
      }
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

    if (isHover) {
      allStars.forEach((star) => star.setAttribute("class", notPickedStar));
      allStars.forEach((star) => {
        if (star.value <= hoverIndex + 1) {
          star.setAttribute("class", pickedStar);
        } else {
          star.setAttribute("class", notPickedStar);
        }
      });
    }
  }, [starRating, isHover, hoverIndex]);

  useEffect(() => {
    dispatch(getReviews(currentSpot?.id));
    updateCount();
  }, [dispatch, isCreating, currentSpot?.id, updateCount]);

  return (
    <div className="deleteSpotModal">
      <h3 style={{ margin: "10px 0", textAlign: "center" }}>
        How was your stay at {currentSpot?.name}?
      </h3>
      {errors && (
        <p className="errorRed" style={{ textAlign: "center" }}>
          {errors?.message}
        </p>
      )}
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
          onMouseEnter={() => {
            setIsHover(true);
            setHoverIndex(0);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            setHoverIndex(0);
          }}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={2}
          onClick={(e) => setStarRating(e.target.value)}
          onMouseEnter={() => {
            setIsHover(true);
            setHoverIndex(1);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            setHoverIndex(0);
          }}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={3}
          onClick={(e) => setStarRating(e.target.value)}
          onMouseEnter={() => {
            setIsHover(true);
            setHoverIndex(2);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            setHoverIndex(0);
          }}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={4}
          onClick={(e) => setStarRating(e.target.value)}
          onMouseEnter={() => {
            setIsHover(true);
            setHoverIndex(3);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            setHoverIndex(0);
          }}
        ></button>
        <button
          className="fa-regular fa-star fa-2xl"
          value={5}
          onClick={(e) => setStarRating(e.target.value)}
          onMouseEnter={() => {
            setIsHover(true);
            setHoverIndex(4);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            setHoverIndex(0);
          }}
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
