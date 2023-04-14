import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import AboutUs from "./components/AboutUs/AboutUs";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Bookings from "./components/Bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <Route path="/">
          <AboutUs />
        </Route>
        <Switch>
          <Route exact path={"/spots/:spotId"}>
            <SpotDetails />
          </Route>
          <Route exact path={"/"}>
            <AllSpots />
          </Route>
          <Route exact path="/bookings">
            <Bookings />
          </Route>
          <Route exact path="/404">
            <PageNotFound />
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
