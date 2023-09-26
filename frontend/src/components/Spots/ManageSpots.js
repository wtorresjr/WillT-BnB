import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./allspots.css";
import { fetchAllSpots, getUserSpots } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "./DeleteSpotModal";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allSpots = useSelector((state) => state?.spots?.allspots?.Spots);
  const usersSpots = [];

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  sessionUser &&
    allSpots?.map(
      (spot) => spot?.ownerId === sessionUser.id && usersSpots.push(spot)
    );

  return (
    <div className="spotsClass">
      <div className="manageSpotsHeader">
        <h3>Manage Your Spots</h3>
        {sessionUser && (
          <NavLink to="/create-a-spot">
            <button className="manageBtnClass">Create a New Spot</button>
          </NavLink>
        )}
      </div>
      {usersSpots &&
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
                  <p>{`$${spot?.price}/night`}</p>
                </div>
              </NavLink>
              <button className="manageBtnClass">
                <OpenModalMenuItem
                  itemText="Update"
                  modalComponent={<DeleteSpotModal />}
                />
              </button>
              <button className="manageBtnClass">
                <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot?.id} />}
                />
              </button>
            </div>
          );
        })}
      {!sessionUser && <p>Log in to see your spots.</p>}
      {!usersSpots.length && sessionUser && <p>You don't have any spots.</p>}
    </div>
  );
};

export default ManageSpots;
