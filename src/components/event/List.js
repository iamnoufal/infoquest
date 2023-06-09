import { useState, useEffect, useContext } from "react";
import { getMessaging, getToken } from "firebase/messaging";

import { getEvents, updateFCMTokenToDB } from "apis/firebase";

import EventCard from "./Card";
import Loader from "components/Loader/Loader";

import { EVENT_CATEGORIES } from "constants/app-defaults";

import { getSortedEventsByCategory } from "helpers/event";

import { AppContext } from "contexts/app";

import "./List.css";

const { technical: technicalCategory, nonTechnical: nonTechnicalCategory, workshops: workshopCategory } = EVENT_CATEGORIES;

const EventsList = () => {
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsByCategory, setEventsByCategory] = useState({});
  const [notify, setNotify] = useState(false);
  const [activeCategory, setActiveCategory] = useState(technicalCategory.name);
  const { session } = useContext(AppContext);

  const handleCategorySelection = (event) => {
    setActiveCategory(event.target.value);
  };

  useEffect(() => {
    /*eslint no-undef: "off"*/
    getEvents()
      .then((response = []) => {
        const eventsObj = getSortedEventsByCategory(response);
        setEventsByCategory(eventsObj);
        setLoadingEvents(false);
      })
      .catch((err) => {
        setLoadingEvents(false);
        throw err;
      });
  }, []);

  useEffect(() => {
    if (session.accessToken && Notification.permission === "granted") {
      setNotify(true);
    }
  }, [session]);

  const registerForNotification = () => {
    if (session.accessToken && window.confirm("Do you want to receive notifications for upcoming events?")) {
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
        .then((token) => {
          updateFCMTokenToDB({ fcm: token });
          setNotify(true);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const renderNotifyButton = () => {
    return (
      <div className="m-auto text-center my-4">
        {notify ? (
          <span className="btn btn-info egister-button rounded-pill px-5">
            You will be notified of events
          </span>
        ) : (
          <button
            className="btn register-button rounded-pill bg-color-aquagreen px-5"
            onClick={registerForNotification}
          >
            Get Notified of Upcoming Events
          </button>
        )}
      </div>
    );
  };

  const eventList = eventsByCategory[activeCategory] || [];
  return (
    <div className="events-list">
      <h2 className="text-center text-white mb-5 heading text-uppercase">Get yourselves engaged with a quest!</h2>
      <div
        className="btn-group event-category-group mb-5"
        role="group"
        aria-label="Event Category radio group"
      >
        <input
          type="radio"
          className="btn-check"
          name="activeCategory"
          value={technicalCategory.name}
          id="btnradio1"
          autoComplete="off"
          onChange={handleCategorySelection}
          checked={activeCategory === technicalCategory.name}
        />
        <label className="btn btn-outline-green text-uppercase fw-bold" htmlFor="btnradio1">
          technical
        </label>

        <input
          type="radio"
          className="btn-check"
          name="activeCategory"
          value={nonTechnicalCategory.name}
          id="btnradio2"
          autoComplete="off"
          onChange={handleCategorySelection}
          checked={activeCategory === nonTechnicalCategory.name}
        />
        <label className="btn btn-outline-green text-uppercase fw-bold" htmlFor="btnradio2">
          non technical
        </label>

        <input
          type="radio"
          className="btn-check"
          name="activeCategory"
          value={workshopCategory.name}
          id="btnradio3"
          autoComplete="off"
          onChange={handleCategorySelection}
          checked={activeCategory === workshopCategory.name}
        />
        <label className="btn btn-outline-green text-uppercase fw-bold" htmlFor="btnradio3">
          workshops
        </label>
      </div>

      <Loader loading={loadingEvents}>
        <div className="m-auto justify-content-center d-flex event-card-list">
          {eventList.map((eventObj) => (
            <EventCard key={eventObj.desc} {...eventObj} />
          ))}
          {eventList.length === 0 && (
            <h4 className="text-center text-uppercase text-white m-auto">
              There are no events in this category yet
            </h4>
          )}
        </div>
        {session.accessToken && renderNotifyButton()}
      </Loader>
    </div>
  );
};

export default EventsList;
