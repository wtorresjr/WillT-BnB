import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./allspots.css";
import { getUserSpots } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "./DeleteSpotModal";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const usersSpots = useSelector((state) => state?.spots?.usersSpots?.Spots);

  useEffect(() => {
    if (sessionUser != null) {
      dispatch(getUserSpots());
    }
  }, [dispatch, sessionUser]);

  return (
    <div className="spotsClass">
      <div className="manageSpotsHeader">
        <h2>Manage Spots</h2>
      </div>
      {sessionUser &&
        usersSpots &&
        usersSpots?.map((spot) => {
          return (
            <div key={spot?.id}>
              <NavLink to={`/spots/${spot.id}`}>
                <div className="spotContainer">
                  <img
                    src={spot?.Spot_Images?.[0].url || spot?.previewImage}
                    className="previewImage"
                    alt={`House in ${spot?.city},${spot?.state}`}
                  />
                  <div className="cityAndRating">
                    <p>{`${spot?.city}, ${spot?.state}`}</p>
                    <p>
                      <i
                        className="fa-solid fa-star"
                        style={{ color: "orange" }}
                      ></i>
                      {`${spot?.avgRating || "New"}`}
                    </p>
                  </div>
                  <p>{`$${spot?.price} · night`}</p>
                </div>
              </NavLink>
              <NavLink to={`/update-a-spot/${spot?.id}`}>
                <button className="manageBtnClass">Update</button>
              </NavLink>
              <button className="manageBtnClass">
                <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot?.id} />}
                />
              </button>
            </div>
          );
        })}
      {sessionUser && usersSpots && !Object.keys(usersSpots)?.length && (
        <NavLink to="/create-a-spot">
          <button className="manageBtnClass">Create a New Spot</button>
        </NavLink>
      )}
      {!sessionUser && <p>Log in to see your spots.</p>}
    </div>
  );
};

export default ManageSpots;
