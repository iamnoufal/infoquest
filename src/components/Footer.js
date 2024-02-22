import wnkLogo from "assets/images/wnk-logo.webp";

import "./Footer.css";
import instaIcon from "assets/images/icon_insta.webp";
import youtubeIcon from "assets/images/icon_youtube.webp";
import { Link } from "react-router-dom";
 
const Footer = () => {
  return (
    <footer className="footer ">
      <hr className="line" />
      <div className="row">
        <div className="col-6 contact-us-section">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item bg-transparent border-0 px-0">
              <a
                href="https://www.instagram.com/invictus_iitm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instaIcon} alt="instagram icon" />
              </a>
            </li>
            <li className="list-group-item bg-transparent border-0 px-0">
              <a
                href="https://www.youtube.com/channel/UCax6gDzWhjc1177nGU2A_Ew"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtubeIcon} alt="youtube icon" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 text-end logo">
          <ul className="list-group list-group-horizontal">
            {/* <li className="list-group-item bg-transparent border-0 px-0">
              <img src={wnkLogo} style={{width:"6rem"}} alt="wnk logo" />
            </li> */}
          </ul>
        </div>
      </div>
      <div>
        <Link to="https://merchant.razorpay.com/policy/LXBqTcG0WUhiy6/terms" target="_blank" rel="noreferrer">Terms and Conditions</Link>
        <Link to="https://merchant.razorpay.com/policy/LXBqTcG0WUhiy6/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link>
        <Link to="https://merchant.razorpay.com/policy/LXBqTcG0WUhiy6/contact_us" target="_blank" rel="noreferrer">Contact Us</Link>
        <Link to="https://merchant.razorpay.com/policy/LXBqTcG0WUhiy6/Shipping" target="_blank" rel="noreferrer">Shipping</Link>
        <Link to="https://merchant.razorpay.com/policy/LXBqTcG0WUhiy6/refund" target="_blank" rel="noreferrer">Refund</Link>
      </div>
    </footer>
  );
};

export default Footer;
