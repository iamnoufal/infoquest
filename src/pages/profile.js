import { useEffect, useState, useContext } from "react";

import Loader from "components/Loader/Loader";
import Layout from "components/Layout";
import Profile from "components/Profile";
import EventPassList from "components/event/PassList";
import AuthButton from "components/button/Auth";

import { getProfileDetails } from "apis/firebase";

import { AppContext } from "contexts/app";
import { Redirect } from "react-router";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { session, setSession } = useContext(AppContext);

  const handleAuthFailure = (response) => {
    const { errorCode, errorMessage } = response;
    alert(`${errorCode}: ${errorMessage}`);
  };

  const handleAuthSuccess = (response) => {
    getProfileDetails().then(res => setSession({...response, profile: res}))
  };

  useEffect(() => {
    if(!session.loading) {
      setLoading(false);
    }
  }, [session])

  useEffect(() => {
    if (session.accessToken ) {
      if (session.profile) {
        setLoading(false)
      }
    }
  }, [session]);

  return (
    <Layout>
      <div className="container event-pass-page">
        <h1 className="text-white text-uppercase text-center my-5 heading">Profile</h1>
        <Loader loading={loading}>
          {session.accessToken ? (
            <>
              {(session.profile.name === null && session.profile !== undefined) ? <Redirect to='/register' /> : (<><Profile {...session.profile} /><EventPassList passes={session.profile.eventPasses} /></>)}
            </>
          ) : (
            <div className="m-auto text-center my-2">
              <AuthButton onAuthSuccess={handleAuthSuccess} onAuthFailure={handleAuthFailure} />
            </div>
          )}
        </Loader>
        <h6 className="text-center my-5 mx-5" style={{color:"rgba(255,255,255,0.6)"}}>
        	If you face any issues signing in with your student mail id or if you can't see your registered event passes, please let us know: <a href="mailto:21f1005287@student.onlinedegree.iitm.ac.in" className="text-white">Web Team</a>
        </h6>
      </div>
    </Layout>
  );
};

export default ProfilePage;
