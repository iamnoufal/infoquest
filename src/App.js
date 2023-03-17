import { useState, useLayoutEffect, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomePage from "pages/home";
import EventsPage from "pages/events";
import TeamPage from "pages/team";
import ProfilePage from "pages/profile";
import Authenticate from "components/Auth";
import PaymentPage from "pages/payment";

import { AppContext } from "contexts/app";

import { parseSessionData } from "helpers/auth";

import { onMessageListener } from "apis/firebase";

import "./App.css";
import AboutPage from "pages/about";
import RegisterPage from "pages/register";

const defaultState = { loading: false, liveData: {} };
function App() {
  const [session, setSession] = useState({ ...defaultState, loading: true });

  useLayoutEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      let data = { ...defaultState };
      if (user) {
        data = { ...defaultState, ...parseSessionData(user), loading: false };
      }
      setSession(data);
    });
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        const {
          notification: { title, body },
        } = payload;
        alert(`${title}\n${body}`);
      })
      .catch((err) => console.err(err));
  });

  return (
    <div className="App">
      <AppContext.Provider value={{ session, setSession }}>
        <BrowserRouter>
          <Switch>

            {/* events page route */}
            <Route exact path="/quests" component={EventsPage} />
            <Route exact path="/team" component={TeamPage} />
            <Route exact path="/register" component={RegisterPage} />

            {/* profile page route. also the route for auth */}
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/" component={HomePage} />

            {/* payment page for hyden */}
            <Route exact path="/payment" component={PaymentPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
