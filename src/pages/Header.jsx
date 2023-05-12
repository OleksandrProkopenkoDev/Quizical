import { Outlet, Link, NavLink } from "react-router-dom";

import userIcon from "../images/user.png";

export default function Header() {
  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#293264",
  };

  return (
    <>
      <header>
        <Link className="site-logo" to="/">
          QUIZZICAL
        </Link>
        <nav>
          <NavLink
            to="/quizz"
            className="nav--link"
            style={({ isActive }) => (isActive ? activeLinkStyle : null)}
          >
            New Quizz
          </NavLink>
          <NavLink
            to="/ratingtable"
            className="nav--link"
            style={({ isActive }) => (isActive ? activeLinkStyle : null)}
          >
            Rating Table
          </NavLink>
          <NavLink to={"/dashboard"} className={"link-user"}>
            <h3>Username</h3>
            <img src={userIcon} className="login-icon" />
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
