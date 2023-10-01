import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { findOne } from "../../store/spots";
import { getReviews } from "../../store/reviews";
import "./spotDetails.css";
import SpotDetailsReviews from "../ReviewsComponent";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spotReviews = useSelector((state) => state?.reviews?.Reviews);
  const thisSpot = useSelector((state) => state?.spots?.oneSpot);
  const spotImgs = useSelector((state) => state?.spots?.oneSpot?.SpotImages);

  useEffect(() => {
    dispatch(getReviews(id));
    dispatch(findOne(id));
  }, [dispatch, id]);

  const previewImg = thisSpot?.SpotImages?.find(
    (image) => image.preview === true
  );

  let imgCount = 0;

  return (
    <>
      <div className="spotDetails">
        <div className="titleLocation">
          <h3>{thisSpot?.name}</h3>
          <p>{`${thisSpot?.city}, ${thisSpot?.state}, ${thisSpot?.country}`}</p>
        </div>

        <div className="imagesContainer">
          {spotImgs && Object.keys(spotImgs)?.length > 5 && (
            <NavLink to={`/all-images/${id}`}>
              {" "}
              <button className="manageBtnClass" id="viewAllImgs">
                View All Images
              </button>
            </NavLink>
          )}
          <div className="previewContainer">
            <img
              src={previewImg?.url}
              className="preview-image"
              alt={`Main view of house in ${thisSpot?.city}, ${thisSpot?.state}`}
            />
          </div>

          <div className="smallImagesContainer">
            {spotImgs &&
              Object.keys(spotImgs)?.length > 1 &&
              spotImgs.map((image) => {
                if (image?.preview === false && imgCount < 4) {
                  imgCount++;
                  return (
                    <div className="moreImages" key={image.id}>
                      <img
                        className="imgCont"
                        src={image?.url}
                        alt={`House in ${thisSpot?.city}, ${thisSpot?.state}`}
                      />
                    </div>
                  );
                }
                return;
              })}
          </div>
        </div>
        <div className="underImgs">
          <div className="spotDescription">
            <h3>{`Hosted by ${thisSpot?.Owner?.firstName} ${thisSpot?.Owner?.lastName}`}</h3>
            <p>{thisSpot?.description}</p>
          </div>
          <div className="reserveContainer">
            <div className="priceNrating">
              <h4>{`$${thisSpot?.price}·night`}</h4>
              <p>
                <i className="fa-solid fa-star" style={{ color: "orange" }}></i>{" "}
                {
                  <strong className="spotDetailsRating">
                    {" "}
                    {thisSpot?.avgStarRating}{" "}
                    {+thisSpot?.numReviews === 0
                      ? "New"
                      : (thisSpot?.numReviews > 1 &&
                          `· ${thisSpot?.numReviews} reviews`) ||
                        `· ${thisSpot?.numReviews} review`}
                  </strong>
                }
              </p>
            </div>
            <button
              id="reserveBtn"
              onClick={() => alert("Feature Coming Soon...")}
            >
              Reserve
            </button>
          </div>
        </div>
        <div className="greyDivider"></div>
        <SpotDetailsReviews />
      </div>
    </>
  );
};

export default SpotDetails;
