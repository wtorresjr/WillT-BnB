import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./allspots.css";
import { fetchAllSpots } from "../../store/spots";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.session?.user?.id);
  const allSpots = useSelector((state) => state?.spots?.allspots?.Spots);
  const usersSpots = [];
  allSpots?.map((spot) => spot?.ownerId === userId && usersSpots.push(spot));

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spotsClass">
      <div className="manageSpotsHeader">
        <h3>Manage Your Spots</h3>
        <NavLink to="/create-a-spot">
          <button className="manageBtnClass">Create a New Spot</button>
        </NavLink>
      </div>

      {usersSpots &&
        usersSpots?.map((spot) => {
          return (
            <NavLink key={spot?.id} to={`/spots/${spot.id}`}>
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
              
          );
        })}
    </div>
  );
};

export default ManageSpots;
