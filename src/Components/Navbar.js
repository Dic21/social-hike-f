import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logIsLogin } from "../Slices/loginSlice";
import loginImage from "../Images/login.svg";

function Navbar() {
  const [currentUser, setCurrentUser] = useState("");
  const { isLogin } = useSelector((state) => {
    return state.login;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logIsLogin(false));
    setCurrentUser("");
  };

  const getCurrentUser = async () => {
    await fetch(`/get-current-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrentUser(data.user.user);
      });
    // console.log(id);
    // console.log(currentUser);
  };
  if (localStorage.getItem("token")) {
    getCurrentUser();
  }

  return (
    <nav>
      <Link to="/">主頁</Link>
      <span className="dropdown">
        <span>推薦地點</span>
        <div className="dropdown-content">
          <div>
            <Link to="/place/p01">港島徑</Link>
          </div>
          <div>
            <Link to="/place/p02">鳳凰徑</Link>
          </div>
          <div>
            <Link to="/place/p03">衛奕信徑</Link>
          </div>
          <div>
            <Link to="/place/p04">麥理浩徑</Link>
          </div>
        </div>
      </span>

      <span className="navright">
        {!isLogin ? (
          <>
            <Link to="/login">
              <span>
                <img src={loginImage} alt="login" /> 登入
              </span>
            </Link>
            <Link to="/register">
              <span>註冊</span>
            </Link>
          </>
        ) : (
          <>
            <span>歡迎回來, {currentUser.toUpperCase()}</span>
            <Link to="/member">
              <span>會員資訊</span>
            </Link>

            <Link to="/login">
              <span onClick={handleLogout}>登出</span>
            </Link>
          </>
        )}
      </span>
    </nav>
  );
}

export default Navbar;
