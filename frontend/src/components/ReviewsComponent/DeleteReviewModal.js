import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteMyReview } from "../../store/reviews";
import { useState, useEffect } from "react";

const DeleteReviewModal = ({ reviewId, updateCount, toggleReviewStatus }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const currentSpot = useSelector((state) => state?.spots?.oneSpot);

  const deleteReview = async () => {
    try {
      await dispatch(deleteMyReview(reviewId));
      setIsDeleting(true);
      toggleReviewStatus(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  useEffect(() => {
    dispatch(getReviews(currentSpot?.id));

    updateCount();
  }, [dispatch, isDeleting]);

  return (
    <div className="deleteSpotModal">
      <h3 style={{ margin: "10px 0", textAlign: "center" }}>Confirm Delete</h3>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={deleteReview}>Yes (Delete Review)</button>
      <button
        style={{ backgroundColor: "rgb(114, 114, 114)" }}
        onClick={closeModal}
      >
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;
