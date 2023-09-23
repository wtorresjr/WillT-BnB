import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotDetails = () => {
  const { id } = useParams();
  const spots = useSelector((state) => state?.spots?.allspots?.Spots);
  const thisSpot = spots.find((spot) => spot.id === parseInt(id));

  return (
    <>
      <h1>Spot Details</h1>
      Spot Name: {thisSpot.previewImage}
    </>
  );
};

export default SpotDetails;
