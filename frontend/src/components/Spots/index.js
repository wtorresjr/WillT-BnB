import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./allspots.css";
import { fetchAllSpots } from "../../store/spots";

const Spots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state?.spots?.allspots?.Spots);
  // console.log(allSpots, "ALL SPOTS");

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spotsClass">
      {allSpots?.map((spot) => {
        return (
          <NavLink to={`/spots/${spot.id}`}>
            <div key={spot?.id} className="spotContainer">
              <img
                src={spot?.Spot_Images?.[0].url || spot?.previewImage}
                className="previewImage"
              />
              <div className="cityAndRating">
                <p>{`${spot?.city}, ${spot?.state}`}</p>
                <p>
                  <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
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
