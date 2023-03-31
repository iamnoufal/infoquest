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

import { getProfileDetails, onMessageListener } from "apis/firebase";

import "./App.css";
import AboutPage from "pages/about";
import RegisterPage from "pages/register";

const defaultState = { loading: false, profile: {} };
function App() {
  const [session, setSession] = useState({ ...defaultState, loading: true });
  useLayoutEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      let data = { ...defaultState };
      if (user) {
        data = { ...defaultState, ...parseSessionData(user), loading: false };
        data['profile'] = await getProfileDetails()
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
            <Route exact path="/register" component={() => {
              return (
                <Authenticate>
                  <RegisterPage />
                </Authenticate>
              )
            }} />

            {/* profile page route. also the route for auth */}
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
