import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./reviewComponentStyle.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import { findOne } from "../../store/spots";

const SpotDetailsReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const spotReviews = useSelector((state) => state?.reviews?.Reviews);
  const currentSpot = useSelector((state) => state?.spots?.oneSpot);

  useEffect(() => {
    dispatch(getReviews(id));
    // dispatch(findOne());
  }, [dispatch, id]);

  let reviewHeader = "";
  if (spotReviews?.length) {
    reviewHeader += currentSpot?.avgStarRating + " -";
    reviewHeader += " " + currentSpot?.numReviews;
    if (spotReviews?.length > 1) {
      reviewHeader += " reviews";
    } else {
      reviewHeader += " review";
    }
  } else {
    reviewHeader = "New";
  }

  return (
    <div className="reviewComponent">
      <i className="fa-solid fa-star" style={{ color: "orange" }}></i>{" "}
      {reviewHeader}
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
              {review?.userId === sessionUser?.id && <button className="manageBtnClass">Delete</button>}
            </div>
          );
        })}
    </div>
  );
};

export default SpotDetailsReviews;
