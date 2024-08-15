import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className=" lg:px-20 footer p-10 bg-neutral text-neutral-content">
        <nav>
          <h6 className="footer-title">Policies</h6>
          <a className="link link-hover">Rules and Regulation</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookies Policy</a>
     
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover flex gap-2"><span><FaPhone /></span> 1-800-700-6200</a>
          <a className="link link-hover flex gap-2"><span><IoMail /></span>info@estarch.org</a>
          <a className="link link-hover flex gap-2"><span><FaLocationDot /></span>3015 Grand Ave, Coconut
            Grove, <br />Merrick Way, FL 12345 </a>
        </nav>
        <nav>
          <h6 className="footer-title">Social Media</h6>
          <a className="link link-hover flex gap-3 text-[28px]"><span><FaFacebook /></span> <span><FaSquareXTwitter /></span><span><FaInstagramSquare /></span></a>

        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control">
            <label className="label">
              <span className="label-text text-white ">Enter your email address</span>
            </label>
            <div className="join">
              <input type="text" placeholder="username@site.com" className="input input-bordered join-item " />
              <button className="btn btn-primary join-item -ml-8">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="p-4 bg-neutral text-neutral-content">
        <p className="text-center">Copyright Estarch © 2024 - All right reserved</p>
      </footer>
    </div>
  );
};

export default Footer;
