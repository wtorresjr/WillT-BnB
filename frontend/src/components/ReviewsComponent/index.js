import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./reviewComponentStyle.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReviewModal";
import { findOne } from "../../store/spots";
import CreateReviewModal from "./CreateReviewModal";

const SpotDetailsReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const spotReviews = useSelector((state) => state?.reviews?.Reviews);
  const currentSpot = useSelector((state) => state?.spots?.oneSpot);
  const [reviewsState, setReviewsState] = useState(0);
  const [isReviewed, setIsReviewed] = useState(false);

  useEffect(() => {
    dispatch(getReviews(id));
    dispatch(findOne(id));
  }, [dispatch, id, reviewsState, isReviewed]);

  useEffect(() => {
    for (let review = 0; review < spotReviews?.length; review++) {
      if (spotReviews[review]?.userId === sessionUser?.id) {
        return setIsReviewed(true);
      } else {
        setIsReviewed(false);
      }
    }
  });

  const updateCount = () => {
    setReviewsState((prevCount) => prevCount + 1);
  };

  const hasThisBeenReviewed = (status) => {
    setIsReviewed(status);
  };

  return (
    <div className="reviewComponent">
      <div className="reviewsHeadDiv">
        <strong>
          <i className="fa-solid fa-star" style={{ color: "orange" }}></i>{" "}
          {currentSpot?.avgStarRating}{" "}
          {currentSpot?.numReviews == 0
            ? "New"
            : (currentSpot?.numReviews > 1 &&
                `- ${currentSpot?.numReviews} reviews`) ||
              `- ${currentSpot?.numReviews} review`}
        </strong>
      </div>

      <div>
        {isReviewed !== true &&
          sessionUser &&
          sessionUser.id !== currentSpot?.ownerId && (
            <button className="manageBtnClass">
              {" "}
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={
                  <CreateReviewModal
                    spotId={currentSpot?.id}
                    updateCount={updateCount}
                    toggleReviewStatus={hasThisBeenReviewed}
                  />
                }
              />
            </button>
          )}
        {currentSpot?.numReviews == 0 &&
          sessionUser?.id !== currentSpot?.ownerId && (
            <p className="beFirstPtag">Be the first to post a review!</p>
          )}
      </div>

      {spotReviews &&
        spotReviews?.map((review) => {
          return (
            <div key={review?.id} className="reviewPanel">
              <h4 className="reviewerInfo">
                {review?.User?.firstName} {review?.User?.lastName}
              </h4>
              <p className="reviewDate">
                {review?.createdAt
                  ? new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })
                  : null}
              </p>
              <p className="reviewText">{review?.review}</p>
              {review?.userId === sessionUser?.id && (
                <button className="manageBtnClass">
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={
                      <DeleteReviewModal
                        reviewId={review?.id}
                        updateCount={updateCount}
                        toggleReviewStatus={hasThisBeenReviewed}
                      />
                    }
                  />
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default SpotDetailsReviews;
