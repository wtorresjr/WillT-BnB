import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserReviews, updateUserReview } from "../../store/reviews";
import { useState, useEffect } from "react";
import { getReviews } from "../../store/reviews";

const UpdateReviewModal = ({
  review,
  updateCount,
  manageReviews,
  handleRefresh,
}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isCreating, setIsCreating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [starRating, setStarRating] = useState(review?.stars);
  const [newReview, setNewReview] = useState(review?.review);
  const [isHover, setIsHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state?.session?.user);

  const createReview = async () => {
    try {
      dispatch(
        await updateUserReview(review?.id, {
          review: newReview,
          stars: +starRating,
        })
      );
      setIsCreating(true);
      updateCount();
      closeModal();
      if (!manageReviews) {
        handleRefresh();
      }
    } catch (error) {
      if (error && error.error) {
        const theErrors = await error.json();
        setErrors(theErrors);
        console.log(error, "<======== Errors state");
      } else {
        console.error("unexpected error", error);
      }
    }
  };
  useEffect(() => {
    if (manageReviews === false) {
      dispatch(getReviews(review?.spotId));
      updateCount();
    } else {
      dispatch(getAllUserReviews(sessionUser?.id));
      updateCount();
    }
  }, [dispatch, isCreating, sessionUser]);

  let notPickedStar = "fa-regular fa-star fa-2xl";
  let pickedStar = "fa-solid fa-star fa-2xl";

  useEffect(() => {
    newReview?.length > 10 ? setIsDisabled(false) : setIsDisabled(true);
  }, [dispatch, newReview, starRating]);

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

  return (
    <div className="deleteSpotModal">
      <h3 style={{ margin: "10px 0", textAlign: "center" }}>
        How was your stay at {review?.Spot?.name}?
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
        Update Your Review
      </button>
    </div>
  );
};

export default UpdateReviewModal;
