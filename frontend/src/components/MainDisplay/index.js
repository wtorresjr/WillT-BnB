import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./mainDisplay.css";
import Spots from "../Spots";
import CreateSpot from "../Spots/CreateSpot";
import SpotDetails from "../Spots/SpotDetails";
import ManageSpots from "../Spots/ManageSpots";

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
      </Switch>
    </div>
  );
};

export default MainDisplay;
