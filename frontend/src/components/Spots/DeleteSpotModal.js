import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserSpot, getUserSpots } from "../../store/spots";
import { useState, useEffect } from "react";

const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteSpot = async () => {
    try {
      await dispatch(deleteUserSpot(spotId));
      setIsDeleting(true);
      closeModal();
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch, isDeleting]);

  return (
    <div className="deleteSpotModal">
      <h3 style={{ margin: "10px 0", textAlign: "center" }}>Confirm Delete</h3>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={deleteSpot}>Yes (Delete Spot)</button>
      <button
        style={{ backgroundColor: "rgb(114, 114, 114)" }}
        onClick={closeModal}
      >
        No (Keep Spot)
      </button>
    </div>
  );
};

export default DeleteSpotModal;
