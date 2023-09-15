import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Spots from "./components/Spots";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    isLoaded && (
      <Switch>
        <Route path="/Login">
          <LoginFormPage />
        </Route>
        <Route path="/Spots">
          <Spots />
        </Route>
      </Switch>
    )
  );
}

export default App;
