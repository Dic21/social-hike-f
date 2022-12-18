import React from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputLoginID,
  inputLoginPassword,
  logLoginErrorMessage,
  logIsLogin,
} from "../Slices/loginSlice";
import PageStyle from "../Login.module.css";

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
    <div className={PageStyle.wrapper}>
      <div className={PageStyle.login}>
        <div className={PageStyle.titlewrapper}>
          <h1 className={PageStyle.title}>Member Login</h1>
        </div>

        <div className={PageStyle.inputWrapper}>
          <div>
           
            <input
              className={PageStyle.input}
              type="text"
              placeholder="username"
              onChange={(e) => {
                 dispatch(inputLoginID(e.target.value));
              }}
            ></input>
          </div>
          <div>
            <input
              className={PageStyle.password}
              type="text"
              placeholder="password"
              onChange={(e) => {
                dispatch(inputLoginPassword(e.target.value));
              }}
            ></input>
          </div>
        </div>

        <div className={PageStyle.error}>
          {loginErrorMsg === "" ? null : (
            <div className="error">{loginErrorMsg}</div>
          )}
        </div>
        <div>
          <button onClick={login} className={PageStyle.btn}>
          Login
          </button>
        </div>
        <div className={PageStyle.navigateToRegister}>
        Do not have an account? <Link to="/register">Register Here</Link>
        </div>
      </div>
    </div>

  );

  //     {/* <GoogleLogin
  //       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
  //       buttonText="Log in with Google"
  //       onSuccess={handleLogin}
  //       onFailure={handleFailure}
  //       cookiePolicy={"single_host_origin"}
  //     ></GoogleLogin> */}
  //   </div>
  // );
};

export default Login;
