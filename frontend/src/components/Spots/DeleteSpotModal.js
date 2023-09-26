import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteUserSpot, fetchAllSpots } from "../../store/spots";


const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const deleteSpot = () => {
    dispatch(deleteUserSpot(spotId));
    closeModal();
  };

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
