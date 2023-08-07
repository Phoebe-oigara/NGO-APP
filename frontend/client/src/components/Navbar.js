// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styling/Navbar.css";

const NavBar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = scrolling ? "scrolled" : "";

  return (
    <nav className={`site-title ${navbarClass}`}>
      <Link to="/" className="site-title">
        NGO CONNECT
      </Link>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link to="/Userlogin">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register">NGORegister</Link>
        </li>
        <li className="nav-item">
          <Link to="/ngologin">Ngologin</Link>
        </li>
        <li className="nav-item">
          <Link to="/ngolist">Ngolist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
