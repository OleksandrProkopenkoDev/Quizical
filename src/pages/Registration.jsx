import { useState } from "react";
import { registerNewUser } from "../service/apiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/auth";

export default function Registration() {
  const [errMessage, setErrMessage] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  // collect form data and control inputs
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    registerNewUser(formData); // this saves new user to DB

    await sleep(200); //without pause login failed

    auth
      .login({
        //this logs in new user
        username: formData.username,
        password: formData.password,
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
          console.log(auth.user);
        } else {
          setErrMessage("Login failed");
        }
      });
  }
  //have onSubmit function
  // on submit send a request to api

  return (
    <>
      <div className="registration-root">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-h1 start-page--title">Create new user</h1>
          {errMessage && <h2 className="error-message">{errMessage}</h2>}
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder=" this is your unique login"
            onChange={handleChange}
            value={formData.username}
          ></input>
          <label>Nickname</label>
          <input
            type="text"
            name="nickname"
            placeholder=" this is your public name in Rating table"
            onChange={handleChange}
            value={formData.nickname}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder=" enter more than 4 symbols"
            onChange={handleChange}
            value={formData.password}
          ></input>

          <button className="start-page--button">Create!</button>
        </form>
      </div>
    </>
  );
}
