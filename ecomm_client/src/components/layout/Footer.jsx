import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="d-flex flex-row flex-wrap">
        <div>
          <h1> Shop Non-Stop on ShopKaro</h1>
          <h3>
            Trusted by more than 1 Crore Indians Cash on Delivery | Free
            Delivery
          </h3>
          <div>
            <img
              alt="Google Play store"
              style={{ marginRight: "2rem" }}
              src="https://images.meesho.com/images/pow/playstore-icon-big_400.webp"
            ></img>
            <img
              alt="App Store"
              src="https://images.meesho.com/images/pow/appstore-icon-big_400.webp"
            ></img>
          </div>
        </div>
        <div>
          <li>Become a supplier</li>
          <li>Career</li>
          <li>Hall of Fame</li>
          <li>Sitemap</li>
          <li>Legal and Policies</li>
          <li>ShopKaro tech Blog</li>
          <li>Notices and Return</li>
        </div>
        <div>
          <h5>Join Us</h5>
          <div className="social_icons">
            <FaPinterestSquare color="red" />
            <FaFacebook color="blue" />
            <FaTwitterSquare color="skyblue" />
            <FaInstagramSquare color="purple" />
          </div>
        </div>
        <div>
          <p>
            Fashnear Technologies Private Limited, Kadubeesanahalli Village,
            Varthur Hobli, Outer Ring Road Bellandur, Chennai, Chennai South,
            Tamil Nadu, India, 670103 E-mail address: query@shopkaro.com
          </p>
        </div>
      </div>

      <h4 className="text-center">
        All Rights reserved &copy; ShopKaro-Ecommerce
      </h4>

      <p className="text-center ml-4">
        <Link to="/about">About</Link>|<Link to="/contact">Contact Us</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer;
