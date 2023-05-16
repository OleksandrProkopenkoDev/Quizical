import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";

import userIcon from "../images/user.png";
import { useAuth } from "../service/auth";

export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#293264",
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/");
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
            {auth.user && <h3>{auth.user.nickname}</h3>}
            <img src={userIcon} className="login-icon" />
          </NavLink>
          {auth.user && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </nav>
      </header>

      <Outlet />
    </>
  );
}
