import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImageToSpot, createSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { checkForErrors } from "../../utils/ErrorCheck";

const CreateSpot = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [exImg1, setExImg1] = useState("");
  const [exImg2, setExImg2] = useState("");
  const [exImg3, setExImg3] = useState("");
  const [exImg4, setExImg4] = useState("");

  const newSpotInfo = {
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: long,
    name: placeName,
    description: description,
    price: price,
    url: previewImg,
    preview: true,
  };

  const handleSubmit = async (e) => {
    dispatch(createSpot(newSpotInfo))
      .then(async (newSpot) => {
        const addImage = await dispatch(
          addImageToSpot(newSpot.id, {
            url: newSpotInfo.url,
            preview: newSpotInfo.preview,
          })
        );

        if (addImage) {
          history.push(`/spots/${newSpot.id}`);
        }
      })
      .catch(async (res) => {
        if (res instanceof Response) {
          const data = await res.json();
          if (data.errors) {
            return setErrors(errorCollector);
          }
        }
      });
  };

  const errorCollector = {};

  const checkForErrors = (e) => {
    e.preventDefault();

    !address.length && (errorCollector.address = "Address is required");
    !city.length && (errorCollector.city = "City is required");
    !state.length && (errorCollector.state = "State is required");
    !country.length && (errorCollector.country = "Country is required");
    !lat.length && (errorCollector.lat = "Latitude is required");
    !long.length && (errorCollector.lng = "Longitude is required");
    if (lat.length && !Number(lat)) {
      errorCollector.lat = "Latitude is not valid";
    }
    if (long.length && !Number(long)) {
      errorCollector.lng = "Longitude is not valid";
    }
    !description.length &&
      (errorCollector.description = "Description is required");
    if (description.length && description.length < 30) {
      errorCollector.description =
        "Description needs a minimum of 30 characters";
    }
    !placeName.length && (errorCollector.name = "Name is required");

    !price.length && (errorCollector.price = "Price is required");
    if (price.length && !Number(price)) {
      errorCollector.price = "Price must be a valid number";
    }
    !previewImg.length && (errorCollector.url = "Preview image is required");

    if (previewImg.length) {
      const protoCheck = previewImg.slice(0, 7);
      const formatCheck = previewImg.slice(-5);
      const parsedProto = protoCheck.split(":");
      const parsedFormat = formatCheck.split(".");
      const values = ["jpeg", "jpg", "png", "http", "https", "ftp", "ftps"];
      const formats = new Set(values);

      if (
        !formats.has(parsedProto[0].toLowerCase()) ||
        previewImg.length === 4 ||
        previewImg.length === 3
      ) {
        errorCollector.url = "Valid URL required";
      }
      if (!parsedFormat[1] || !formats.has(parsedFormat[1].toLowerCase())) {
        errorCollector.url = "Image URL must end in .png .jpg .jpeg";
      }
    }
    setErrors(errorCollector);

    if (!Object.keys(errorCollector).length) {
      return handleSubmit();
    }
    console.log("Errors length", Object.keys(errorCollector).length);
  };

  return (
    <form onSubmit={checkForErrors}>
      <div className="newSpotForm">
        <h1>Create a new Spot</h1>
        <h3 style={{ padding: "10px 0 0 0" }}>Where's your place located?</h3>
        <p style={{ padding: "0 0 20px 0" }}>
          Guests will only get your exact address once they have booked a
          reservation
        </p>
        <label>Country</label>
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {errors.country && <p className="errorRed">{errors.country}</p>}
        <label>Street Address</label>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="errorRed">{errors.address}</p>}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexFlow: "column", width: "60%" }}>
            <label>City</label>
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p className="errorRed">{errors.city}</p>}
          </div>
          <div style={{ display: "flex", flexFlow: "column", width: "35%" }}>
            <label>State</label>
            <input
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {errors.state && <p className="errorRed">{errors.state}</p>}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexFlow: "column", width: "48%" }}>
            <label>Longitude</label>
            <input
              name="lng"
              placeholder="Longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
            {errors.lng && <p className="errorRed">{errors.lng}</p>}
          </div>
          <div style={{ display: "flex", flexFlow: "column", width: "48%" }}>
            <label>Latitude</label>
            <input
              name="lat"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            {errors.lat && <p className="errorRed">{errors.lat}</p>}
          </div>
        </div>

        <span className="greyDivider"></span>
        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          style={{ backgroundColor: "rgb(208,243,255)", resize: "none" }}
          rows={"6"}
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="errorRed">{errors.description}</p>}
        <span className="greyDivider"></span>
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          you place special.
        </p>
        <input
          placeholder="Name of your spot"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        {errors.name && <p className="errorRed">{errors.name}</p>}
        <span className="greyDivider"></span>
        <h3>Set a base price for your spot</h3>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>$</strong>
          <input
            name="price"
            placeholder="Price per night (USD)"
            style={{ width: "95%" }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors.price && <p className="errorRed">{errors.price}</p>}
        <span className="greyDivider"></span>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          placeholder="Preview Image URL"
          value={previewImg}
          onChange={(e) => setPreviewImg(e.target.value)}
        />
        {errors.url && <p className="errorRed">{errors.url}</p>}
        <input
          placeholder="Image URL"
          value={exImg1}
          onChange={(e) => setExImg1(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={exImg2}
          onChange={(e) => setExImg2(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={exImg3}
          onChange={(e) => setExImg3(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={exImg4}
          onChange={(e) => setExImg4(e.target.value)}
        />
        <span className="greyDivider"></span>
        <button>Create Spot</button>
      </div>
    </form>
  );
};

export default CreateSpot;
