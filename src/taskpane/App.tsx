import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AnnotationPage from "./pages/annotate.page";
import SigninPage from "./pages/signin.page";
import UnathenticatePage from "./pages/unathenticate.page";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <SigninPage />
        </Route>
        <Route exact path="/annotate">
          <AnnotationPage />
        </Route>
        <Route exact path="/unathenticate">
          <UnathenticatePage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
