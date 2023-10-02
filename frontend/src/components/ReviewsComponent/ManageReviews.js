import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
import "../Spots/allspots.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { getAllUserReviews } from "../../store/reviews";
import DeleteReviewModal from "./DeleteReviewModal";
import { findOne } from "../../store/spots";
import UpdateReviewModal from "./UpdateReviewModal";

const ManageReviews = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const usersReviews = useSelector((state) => state?.reviews?.Reviews);
  const [reviewsState, setReviewsState] = useState(0);
  const [isReviewed, setIsReviewed] = useState(false);

  const updateCount = () => {
    setReviewsState((prevCount) => prevCount + 1);
  };

  const hasThisBeenReviewed = (status) => {
    setIsReviewed(status);
  };

  useEffect(() => {
    dispatch(findOne(usersReviews?.Spot?.id));
    dispatch(getAllUserReviews(sessionUser?.id));
  }, [dispatch, sessionUser, reviewsState]);

  return (
    <div className="spotsClass" id="manageReviews">
      <div className="manageSpotsHeader">
        <h2>Manage Reviews</h2>
      </div>
      {sessionUser &&
        usersReviews &&
        usersReviews?.map((review) => {
          return (
            <div
              key={review?.id}
              className="reviewPanel"
              id="manageReviewsPanel"
            >
              <div className="reviewInfo">
                <h4 className="reviewerInfo">{review?.Spot?.name}</h4>
                <p className="reviewDate">
                  {review?.createdAt
                    ? new Date(review.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })
                    : null}
                </p>
                <p className="reviewText">{review?.review}</p>
                <button className="manageBtnClass">
                  <OpenModalMenuItem
                    itemText="Update"
                    modalComponent={
                      <UpdateReviewModal
                        review={review}
                        updateCount={updateCount}
                      />
                    }
                  />
                </button>
                <button className="manageBtnClass">
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={
                      <DeleteReviewModal
                        reviewId={review?.id}
                        updateCount={updateCount}
                        toggleReviewStatus={hasThisBeenReviewed}
                        manageReviews={true}
                      />
                    }
                  />
                </button>
              </div>
              <div className="revImgContainer">
                <img
                  src={review?.Spot?.previewImage}
                  className="reviewSpotImg"
                />
              </div>
            </div>
          );
        })}
      {sessionUser && usersReviews && !Object.keys(usersReviews)?.length && (
        <p>You don't have any reviews.</p>
      )}
      {!sessionUser && <p>Log in to see your reviews.</p>}
    </div>
  );
};

export default ManageReviews;
