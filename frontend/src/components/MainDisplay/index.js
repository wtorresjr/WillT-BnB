import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./mainDisplay.css";
import Spots from "../Spots";

const MainDisplay = () => {
  return (
    <div className="mainDisplay">
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
      </Switch>
    </div>
  );
};

export default MainDisplay;
