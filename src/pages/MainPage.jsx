import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../service/auth";

export default function MainPage() {
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState({
    userId: -1,
    username: "",
    nickname: "not loaded",
    password: "",
  });
  const auth = useAuth();
  const loginedUser = auth.user;
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    auth
      .login({
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((e) => {
        if (!e?.response) {
          setErrMessage("No server response");
        } else if (e.response?.status === 400) {
          setErrMessage("Missing username or password");
        } else if (e.response?.status === 401) {
          setErrMessage("Not authorized");
        } else {
          setErrMessage("Login failed");
        }
      });
  }

  return (
    <div className="greeting-container">
      {!loginedUser && (
        <div className="login-root">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-h1 start-page--title">Please Login</h1>
            {errMessage && <h2 className="error-message">{errMessage}</h2>}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder=" John Doe"
              value={user.username}
              onChange={handleChange}
              required
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder=" 1234"
              value={user.password}
              onChange={handleChange}
              required
            ></input>
            <h5>
              Haven`t account?{" "}
              <Link className="login-ref" to={"/registration"}>
                create account
              </Link>
            </h5>
            <button className="start-page--button">Login</button>
          </form>
        </div>
      )}
      <hr className="vertical-line" />
      <div className="start-page">
        <h1 className="start-page--title">Quizzical</h1>
        <h3 className="start-page--description">
          You can start quizz now. Or login and access to your statistic data
          and players rating table!
        </h3>
        <div className="button-div">
          <Link className="start-page--link" to={"/quizz"}>
            <button className="start-page--button">Start quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
