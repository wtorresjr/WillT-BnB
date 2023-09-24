import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./allspots.css";
import { fetchAllSpots } from "../../store/spots";

const Spots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state?.spots?.allspots?.Spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spotsClass">
      {allSpots?.map((spot) => {
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

export default Spots;
