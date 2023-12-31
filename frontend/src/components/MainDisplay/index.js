// import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./mainDisplay.css";
import Spots from "../Spots";
import CreateSpot from "../Spots/CreateSpot";
import SpotDetails from "../Spots/SpotDetails";
import ManageSpots from "../Spots/ManageSpots";
import UpdateSpotComponent from "../Spots/UpdateSpotComponent";
import ManageReviews from "../ReviewsComponent/ManageReviews";
import AllImagesComponent from "../AllImageComponent/AllImagesComponent";

const MainDisplay = () => {
  return (
    <div className="mainDisplay">
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
        <Route exact path="/create-a-spot">
          <CreateSpot />
        </Route>
        <Route exact path="/spots/:id">
          <SpotDetails />
        </Route>
        <Route exact path="/manage-spots">
          <ManageSpots />
        </Route>
        <Route exact path="/update-a-spot/:spotId">
          <UpdateSpotComponent />
        </Route>
        <Route exact path="/manage-reviews">
          <ManageReviews />
        </Route>
        <Route exact path="/all-images/:spotId">
          <AllImagesComponent />
        </Route>
        <Route path="*">
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default MainDisplay;
