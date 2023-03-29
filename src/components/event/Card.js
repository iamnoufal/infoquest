import { AppContext } from "contexts/app";
import { useContext } from "react";
import PaymentButton from "components/button/Payment";

import "./Card.css";
import Ribbon from "components/Ribbon";
import { Link } from "react-router-dom";
import RegisterButton from "components/button/Register";

const EventCard = (event) => {
  const { session } = useContext(AppContext);
  const options = { hour: "2-digit", minute: "2-digit" };
  const startDate = new Date(event.start.seconds * 1000).toDateString();
  const endDate = new Date(event.end.seconds * 1000).toDateString();
  const startTime = new Date(event.start.seconds * 1000).toLocaleTimeString("en-US", options);
  const endTime = new Date(event.end.seconds * 1000).toLocaleTimeString("en-US", options);
  const btnProps = session.accessToken ? { href: event.gform, target: "_blank" } : { href: "/pass" };
  const completedEventClasses = event.completed ? "opacity-50" : "";
  const Button = () => {
    if (session.profile.name == null) {
      return <Link to="profile"><button class="btn btn-primary auth-btn">Login</button></Link>
    } else {
      if (event.category == 'workshop') {
        return <PaymentButton workshopName={event.name} amt={event.amt} {...session.profile} />
      } else {
        return <RegisterButton eventName={event.name} profile={session} />
      }
    }
  }
  return (
    <div className="event-card card mx-4 mt-2 mb-3 p-0 rounded">
      {event.completed && <Ribbon text="Completed" className="zindex-tooltip" />}
      <div className="row">
        <div className={completedEventClasses}>
          <img src={event.img} alt={event.desc} className="card-img-left event-img" />
        </div>
        <div className="">
          <div className="card-body m-auto text-center">
            <div className="name card-title text-uppercase text-white fw-bold mb-3">{event.name}</div>
            <div className="date-start">
              <span className="text-white">Starts: </span>
              {startDate} {startTime}
            </div>
            <div className="date-start">
              <span className="text-white">Ends: </span>
              {endDate} {endTime}
            </div>
            <div className="mt-3 description">{event.desc}</div>
            <Button />
            {event.rules && (
              <a
                className="mx-1 btn mt-3 mb-3 register-button rounded-pill bg-color-aquagreen"
                target="_blank"
                rel="noreferrer noopener"
                href={event.rules}
              >
                Rules
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
