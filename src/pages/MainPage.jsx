import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="greeting-container">
      <div className="login-root">
        <form className="login-form">
          <h1 className="login-h1 start-page--title">Please Login</h1>
          <label>Username</label>
          <input type="text" name="username"></input>
          <label>Password</label>
          <input type="password"></input>
          <h5>
            Haven`t account?{" "}
            <Link className="login-ref" to={"/registration"}>
              create account
            </Link>
          </h5>
          <button className="start-page--button">Login</button>
        </form>
      </div>
      <hr className="vertical-line" />
      <div className="start-page">
        <h1 className="start-page--title">Quizzical</h1>
        <h3 className="start-page--description">
          You can start quizz now. Or login and access to your statistic data
          and players rating table!
        </h3>
        <Link className="start-page--link" to={"/quizz"}>
          <button className="start-page--button">Start quiz</button>
        </Link>
      </div>
    </div>
  );
}
