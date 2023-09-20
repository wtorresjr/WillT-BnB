import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./allspots.css";
import { fetchAllSpots } from "../../store/spots";

const Spots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state?.spots?.allspots?.Spots);
  console.log(allSpots, "ALL SPOTS");

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spotsClass">
      {allSpots?.map((spot) => {
        return <li key={spot.id}>{spot.previewImage}</li>;
      })}
    </div>
  );
};

export default Spots;
