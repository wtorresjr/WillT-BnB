import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { findOne } from "../../store/spots";

const AllImagesComponent = () => {
  const dispatch = useDispatch();
  const thisSpot = useSelector((state) => state?.spots?.oneSpot);
  const spotImages = useSelector((state) => state?.spots?.oneSpot?.SpotImages);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(findOne(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="allImages">
      <div className="allImagesHeader">
        <h1>All Images for {thisSpot?.name}</h1>
        <NavLink to={`/spots/${spotId}`}>
          <button className="manageBtnClass">Return To {thisSpot?.name}</button>
        </NavLink>
      </div>
      <div className="allImgsContainer">
        {spotImages &&
          spotImages?.map((image) => {
            return (
              <img
                src={image?.url}
                className="allImgsImg"
                key={image?.id}
                alt={thisSpot?.name}
              />
            );
          })}
      </div>
      <NavLink to={`/spots/${spotId}`} style={{ float: "right" }}>
        <button className="manageBtnClass">Return To {thisSpot?.name}</button>
      </NavLink>
    </div>
  );
};

export default AllImagesComponent;
