import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllSpots } from "../../store/spots";
import "./spotDetails.css";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSpots(id));
  }, [dispatch, id]);

  const thisSpot = useSelector((state) =>
    state?.spots?.allspots?.Spots.find((spot) => spot.id === parseInt(id))
  );

  return (
    <div className="spotDetails">
      <h3>{thisSpot?.name}</h3>
      <span></span>
      <p>{`${thisSpot?.city}, ${thisSpot?.state}, ${thisSpot?.country}`}</p>
      <img src={thisSpot?.previewImage} className="preview-image" />

      <div className="underImgs">
        <p className="spotDescription">
          <h3>{`Hosted by`}</h3>
          {thisSpot?.description}
        </p>
        <div className="reserveContainer">
          <div className="priceNrating">
            <h4>{`$${thisSpot?.price}/night`}</h4>
            <p>
              {thisSpot.avgStarRating || "New"}{" "}
              {thisSpot.numReviews || "No reviews yet"}
            </p>
          </div>
          <button id="reserveBtn">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
