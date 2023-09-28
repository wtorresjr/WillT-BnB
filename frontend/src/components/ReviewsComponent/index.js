import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./reviewComponentStyle.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReviewModal";
import { findOne } from "../../store/spots";

const SpotDetailsReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [reviewsState, setReviewsState] = useState(0);
  const sessionUser = useSelector((state) => state?.session?.user);
  const spotReviews = useSelector((state) => state?.reviews?.Reviews);
  const currentSpot = useSelector((state) => state?.spots?.oneSpot);

  useEffect(() => {
    dispatch(getReviews(id));
    dispatch(findOne(id));
  }, [dispatch, id, reviewsState]);

  const updateCount = () => {
    console.log("Update Count Function Called");
    setReviewsState((prevCount) => prevCount + 1);
  };

  return (
    <div className="reviewComponent">
      <strong>
        <i className="fa-solid fa-star" style={{ color: "orange" }}></i>{" "}
        {currentSpot?.avgStarRating}{" "}
        {currentSpot?.numReviews == 0
          ? "New"
          : (currentSpot?.numReviews > 1 &&
              `- ${currentSpot?.numReviews} reviews`) ||
            `- ${currentSpot?.numReviews} review`}
      </strong>
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