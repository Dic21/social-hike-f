import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  inputRegisterID,
  inputRegisterName,
  inputRegisterPassword,
  logRegisterErrorMessage,
} from "../Slices/registerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerID, registerName, registerPassword, registerErrorMsg } =
    useSelector((state) => {
      return state.register;
    });

  const register = () => {
    console.log("register");
    fetch("/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        id: registerID,
        username: registerName,
        password: registerPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          // console.log(data);
          dispatch(logRegisterErrorMessage(`${data.message}`));
        } else {
          console.log(`Register successfully`);
          dispatch(logRegisterErrorMessage(""));
          navigate("/place");
        }
      });
  };

  return (
    <div>
      <div className="register">
        <h3>Register</h3>
        <input
          className="input"
          type="text"
          placeholder="ID"
          onChange={(e) => {
            dispatch(inputRegisterID(e.target.value));
          }}
        />
        <input
          className="input"
          type="text"
          placeholder="username"
          onChange={(e) => {
            dispatch(inputRegisterName(e.target.value));
          }}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            dispatch(inputRegisterPassword(e.target.value));
          }}
        />
        <div className="errorMsg">
          {registerErrorMsg === "" ? null : (
            <div className="error">{registerErrorMsg}</div>
          )}
        </div>

        <button onClick={register} className="btn">
          register
        </button>
        <div className="line"></div>
        <div className="navigateToRegister">
          Already an account? <Link to="/login">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
