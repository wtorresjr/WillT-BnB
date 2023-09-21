import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./mainDisplay.css";
import Spots from "../Spots";
import CreateSpot from "../Spots/CreateSpot";

const MainDisplay = () => {
  return (
    <div className="mainDisplay">
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
        <Route exact path="/spots">
          <CreateSpot />
        </Route>
      </Switch>
    </div>
  );
};

export default MainDisplay;
