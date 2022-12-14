import React from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputLoginID,
  inputLoginPassword,
  logLoginErrorMessage,
  logIsLogin,
} from "../Slices/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginID, loginPassword, loginErrorMsg, isLogin } = useSelector(
    (state) => {
      return state.login;
    }
  );
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

  // member();

  const login = () => {
    console.log("login");
    fetch("/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: loginID,
        password: loginPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          // console.log(data);
          dispatch(logLoginErrorMessage(`${data.message}`));
        } else {
          console.log(data);
          dispatch(logLoginErrorMessage(""));
          dispatch(logIsLogin(true));
          localStorage.setItem("token", data.token);

          navigate("/");
        }
      });
  };
  return (
    <div>
      <div className="login">
        {/* <h3>Login</h3> */}
        <input
          className="input"
          type="text"
          placeholder="ID"
          onChange={(e) => {
            dispatch(inputLoginID(e.target.value));
          }}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            dispatch(inputLoginPassword(e.target.value));
          }}
        />
        <div className="errorMsg">
          {loginErrorMsg === "" ? null : (
            <div className="error">{loginErrorMsg}</div>
          )}
        </div>

        <button onClick={login} className="btn">
          Login
        </button>

        <div className="line"></div>
        <div className="navigateToRegister">
          Do not have an account? <Link to="/register">Register Here</Link>
        </div>
      </div>

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
