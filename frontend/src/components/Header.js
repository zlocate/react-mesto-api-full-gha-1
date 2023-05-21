import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

function Header({ email, title, route, onClick }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта mesto" />
      <nav className="header__auth">
        <p className="header__text">{email}</p>
        <Link
          to={route}
          className="header__link link-opacity"
          type="button"
          onClick={onClick}
        >
          {title}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
