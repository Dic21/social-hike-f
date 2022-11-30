import React from "react";
import GoogleLogin from "react-google-login";

const Login = () => {
  // const handleFailure = (result) => {
  //   alert(result);
  // };

  // const handleLogin = (googleData) => {
  //   console.log(googleData);
  // };
  const member = () => {
    console.log("login");
    fetch("/member-list", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  member();
  return (
    <div>
      <h1>Login with google</h1>

      {/* <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin> */}
    </div>
  );
};

export default Login;
