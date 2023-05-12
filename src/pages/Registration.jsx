export default function Registration() {
  return (
    <>
      <div className="registration-root">
        <form className="login-form">
          <h1 className="login-h1 start-page--title">Create new user</h1>
          <label>Username</label>
          <input type="text" name="username"></input>
          <label>Nickname</label>
          <input type="text" name="nickname"></input>
          <label>Password</label>
          <input type="password"></input>

          <button className="start-page--button">Create!</button>
        </form>
      </div>
    </>
  );
}
