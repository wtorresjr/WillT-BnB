import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteMyReview } from "../../store/reviews";
import { useState, useEffect } from "react";

const CreateReviewModal = ({ reviewId, updateCount }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isCreating, setIsCreating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const currentSpot = useSelector((state) => state?.spots?.oneSpot);

  const createReview = async () => {
    console.log("Submit review clicked!");
    // try {
    //   await dispatch(deleteMyReview(reviewId));
    //   setIsDeleting(true);
    //   closeModal();
    // } catch (error) {
    //   console.error("Error deleting spot:", error);
    // }
  };

  useEffect(() => {
    dispatch(getReviews(currentSpot?.id));
    updateCount();
  }, [dispatch, isCreating]);

  return (
    <div className="deleteSpotModal">
      <h3 style={{ margin: "10px 0", textAlign: "center" }}>How was your stay?</h3>
      <textarea id="reviewTextArea">Are you sure you want to delete this review?</textarea>
      <button onClick={createReview} disabled={isDisabled} id="submitReviewBtn">
        Submit Your Review
      </button>
    </div>
  );
};

export default CreateReviewModal;
