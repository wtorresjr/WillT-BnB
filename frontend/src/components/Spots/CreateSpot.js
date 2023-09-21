import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

const CreateSpot = () => {
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

 const handleSubmit = async (e) => {
   e.preventDefault();

   const newSpotData = {
     address: address,
     city: city,
     state: state,
     country: country,
     lat: lat,
     lng: long, 
     name: placeName,
     description: description,
     price: price,
   };

   try {
     const createdSpot = await dispatch(createSpot(newSpotData));
     if (createdSpot) {
       console.log(createdSpot);
       history.push(`/spots/${createdSpot.id}`);
     }
   } catch (error) {
     console.error("Error:", error);
   }
 };


  return (
    <form onSubmit={handleSubmit}>
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
        <label>Street Address</label>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexFlow: "column", width: "60%" }}>
            <label>City</label>
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexFlow: "column", width: "35%" }}>
            <label>State</label>
            <input
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexFlow: "column", width: "48%" }}>
            <label>Longitude</label>
            <input
              placeholder="Longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexFlow: "column", width: "48%" }}>
            <label>Latitude</label>
            <input
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
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
            placeholder="Price per night (USD)"
            style={{ width: "95%" }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <span className="greyDivider"></span>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input placeholder="Preview Image URL" />
        <input placeholder="Image URL" />
        <input placeholder="Image URL" />
        <input placeholder="Image URL" />
        <input placeholder="Image URL" />
        <span className="greyDivider"></span>
        <button>Create Spot</button>
      </div>
    </form>
  );
};

export default CreateSpot;
