import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findOne } from "../../store/spots";
import "./spotDetails.css";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const thisSpot = useSelector((state) => state?.spots?.oneSpot);
  const spotImgs = useSelector((state) => state?.spots?.oneSpot?.SpotImages);

  useEffect(() => {
    dispatch(findOne(id));
  }, [dispatch]);

  return (
    <div className="spotDetails">
      <div className="titleLocation">
        <h3>{thisSpot?.name}</h3>
        <p>{`${thisSpot?.city}, ${thisSpot?.state}, ${thisSpot?.country}`}</p>
      </div>

      <div className="imagesContainer">
        <div className="previewContainer">
          <img src={thisSpot?.SpotImages[0].url} className="preview-image" />
        </div>
        <div className="smallImagesContainer">
          {spotImgs &&
            Object.keys(spotImgs).length > 1 &&
            spotImgs.map((image) => {
              if (image.preview === false) {
                return (
                  <div className="moreImages" key={image.id}>
                    <img className="imgCont" src={image?.url} />
                  </div>
                );
              }
            })}
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
      <div className="greyDivider"></div>
    </div>
  );
};

export default SpotDetails;
