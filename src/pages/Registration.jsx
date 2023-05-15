import { useState } from "react";
import { registerNewUser } from "../service/apiService";
import { useNavigate } from "react-router-dom";

export default function Registration() {
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

  function handleSubmit(event) {
    event.preventDefault();
    const response = registerNewUser(formData);
    // console.log(response);
    navigate("/dashboard");
  }
  //have onSubmit function
  // on submit send a request to api

  return (
    <>
      <div className="registration-root">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-h1 start-page--title">Create new user</h1>
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
