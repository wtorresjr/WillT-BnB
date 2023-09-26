import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImageToSpot, createSpot } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import { findOne } from "../../store/spots";
import { updateUsersSpot } from "../../store/spots";

const UpdateSpotComponent = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();
  const thisSpot = useSelector((state) => state?.spots?.oneSpot);

  useEffect(() => {
    dispatch(findOne(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    setAddress(thisSpot?.address || "");
    setCity(thisSpot?.city || "");
    setState(thisSpot?.state || "");
    setCountry(thisSpot?.country || "");
    setLat(thisSpot?.lat || "");
    setLong(thisSpot?.lng || "");
    setPlaceName(thisSpot?.name || "");
    setDescription(thisSpot?.description || "");
    setPrice(thisSpot?.price || "");
    setPreviewImg(thisSpot?.SpotImages[0].url || "");
    setExImg1(thisSpot?.SpotImages[1].url || "");
    setExImg2(thisSpot?.SpotImages[2].url || "");
    setExImg3(thisSpot?.SpotImages[3].url || "");
    setExImg4(thisSpot?.SpotImages[4].url || "");
  }, [dispatch, thisSpot]);

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

  let extraImages = [];
  let validExtraImages = [];
  let errorCollector = {};
  const handleSubmit = async (e) => {
    dispatch(updateUsersSpot(spotId, newSpotInfo));
    history
      .push(`/spots/${spotId}`)
      // .then(async (newSpot) => {
      //   const addImage = await dispatch(
      //     addImageToSpot(newSpot.id, {
      //       url: newSpotInfo.url,
      //       preview: newSpotInfo.preview,
      //     })
      //   );

      //   if (addImage) {
      //     if (validExtraImages.length) {
      //       validExtraImages.map((image) =>
      //         dispatch(
      //           addImageToSpot(newSpot.id, {
      //             url: image,
      //             preview: false,
      //           })
      //         )
      //       );
      //     }
      //   }
      // })
      // .catch(async (res) => {
      //   if (res instanceof Response) {
      //     const data = await res.json();
      //     if (data.errors) {
      //       return setErrors(errorCollector);
      //     }
      //   }
      // });
  };

  const checkValidUrl = (imageUrl) => {
    const protoCheck = imageUrl.slice(0, 7);
    const formatCheck = imageUrl.slice(-5);
    const parsedProto = protoCheck.split(":");
    const parsedFormat = formatCheck.split(".");
    const values = ["jpeg", "jpg", "png", "http", "https", "ftp", "ftps"];

    if (
      !values.includes(parsedProto[0].toLowerCase()) ||
      imageUrl.length === 4 ||
      imageUrl.length === 3
    ) {
      return "Valid URL required";
    }
    if (!parsedFormat[1] || !values.includes(parsedFormat[1].toLowerCase())) {
      return "Image URL must end in .png .jpg .jpeg";
    }
    return 0;
  };

  const checkForErrors = (e) => {
    e.preventDefault();
    errorCollector = {};

    !address.length && (errorCollector.address = "Address is required");
    !city.length && (errorCollector.city = "City is required");
    !state.length && (errorCollector.state = "State is required");
    !country.length && (errorCollector.country = "Country is required");
    !lat && (errorCollector.lat = "Latitude is required");
    !long && (errorCollector.lng = "Longitude is required");
    if (lat && !Number(lat)) {
      errorCollector.lat = "Latitude is not valid";
    }
    if (long && !Number(long)) {
      errorCollector.lng = "Longitude is not valid";
    }
    !description.length &&
      (errorCollector.description = "Description is required");
    if (description.length && description.length < 30) {
      errorCollector.description =
        "Description needs a minimum of 30 characters";
    }
    !placeName.length && (errorCollector.name = "Name is required");

    !price && (errorCollector.price = "Price is required");
    if (price && !Number(price)) {
      errorCollector.price = "Price must be a valid number";
    }

    !previewImg.length && (errorCollector.url = "Preview image is required");

    if (previewImg.length) {
      let msg = checkValidUrl(previewImg);
      if (msg.length) {
        errorCollector.url = msg;
      }
    }

    extraImages = [
      { exImg1: exImg1 },
      { exImg2: exImg2 },
      { exImg3: exImg3 },
      { exImg4: exImg4 },
    ];

    for (let i = 0; i < extraImages.length; i++) {
      let currImgUrl = extraImages[i];
      let currUrlValue = Object.values(currImgUrl);
      let currUrlKey = Object.keys(currImgUrl);

      if (currUrlValue[0].length) {
        let msg = checkValidUrl(currUrlValue[0]);
        if (msg.length) {
          errorCollector[currUrlKey[0]] = msg;
        } else {
          validExtraImages.push(currUrlValue[0]);
        }
      }
    }

    setErrors(errorCollector);

    if (!Object.keys(errorCollector).length) {
      return handleSubmit();
    }
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
          name="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {errors.country && <p className="errorRed">{errors.country}</p>}
        <label>Street Address</label>
        <input
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="errorRed">{errors.address}</p>}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexFlow: "column", width: "60%" }}>
            <label>City</label>
            <input
              name="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p className="errorRed">{errors.city}</p>}
          </div>
          <div style={{ display: "flex", flexFlow: "column", width: "35%" }}>
            <label>State</label>
            <input
              name="state"
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
          name="description"
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
          name="spotname"
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
          name="previewImg"
          placeholder="Preview Image URL"
          value={previewImg}
          onChange={(e) => setPreviewImg(e.target.value)}
        />
        {errors.url && <p className="errorRed">{errors.url}</p>}
        <input
          name="exImg1"
          placeholder="Image URL"
          value={exImg1}
          onChange={(e) => setExImg1(e.target.value)}
        />
        {errors.exImg1 && <p className="errorRed">{errors.exImg1}</p>}
        <input
          name="exImg2"
          placeholder="Image URL"
          value={exImg2}
          onChange={(e) => setExImg2(e.target.value)}
        />
        {errors.exImg2 && <p className="errorRed">{errors.exImg2}</p>}
        <input
          name="exImg3"
          placeholder="Image URL"
          value={exImg3}
          onChange={(e) => setExImg3(e.target.value)}
        />
        {errors.exImg3 && <p className="errorRed">{errors.exImg3}</p>}
        <input
          name="exImg4"
          placeholder="Image URL"
          value={exImg4}
          onChange={(e) => setExImg4(e.target.value)}
        />
        {errors.exImg4 && <p className="errorRed">{errors.exImg4}</p>}
        <span className="greyDivider"></span>
        <button>Create Spot</button>
      </div>
    </form>
  );
};

export default UpdateSpotComponent;
