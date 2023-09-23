import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findOne } from "../../store/spots";
import "./spotDetails.css";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findOne(id));
  }, [dispatch, id]);

  const thisSpot = useSelector((state) => state?.spots?.oneSpot);

  return (
    <div className="spotDetails">
      <h3>{thisSpot?.name}</h3>
      <span></span>
      <p>{`${thisSpot?.city}, ${thisSpot?.state}, ${thisSpot?.country}`}</p>
      <div className="imagesContainer">
        <div className="previewContainer">
          <img src={thisSpot?.SpotImages[0].url} className="preview-image" />
        </div>
        <div className="smallImagesContainer">
          <div className="moreImages">
            <img className="imgCont" />
          </div>
          <div className="moreImages">
            <img className="imgCont" />
          </div>
          <div className="moreImages">
            <img className="imgCont" />
          </div>
          <div className="moreImages">
            <img className="imgCont" />
          </div>
        </div>
      </div>
      <div className="underImgs">
        <p className="spotDescription">
          <h3>{`Hosted by ${thisSpot?.Owner.firstName} ${thisSpot?.Owner.lastName}`}</h3>
          {thisSpot?.description}
        </p>
        <div className="reserveContainer">
          <div className="priceNrating">
            <h4>{`$${thisSpot?.price}/night`}</h4>
            <p>
              <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
              {`${thisSpot?.avgStarRating || "New"}`}

              {thisSpot?.numReviews > 0
                ? ` - ${thisSpot?.numReviews} reviews`
                : ""}
            </p>
          </div>
          <button id="reserveBtn">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
