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
    <div className="custom-navbar">
      <nav className={`site-title ${navbarClass}`}  >
        <Link to="/" className="site-title">
        <img src="/images/pagelogo.jpg" alt="userlogin" className="img-fluid" />
        </Link>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/donate">Donate</Link>
          </li>
          <li className="nav-item">
            <Link to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/ngolist">Listed Ngos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
