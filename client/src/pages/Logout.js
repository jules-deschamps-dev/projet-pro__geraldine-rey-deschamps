import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("token"))
      .catch((err) => console.log(err));
    window.location = "/";
  };
  return (
    <img
      src={`${process.env.REACT_APP_CLIENT_URL}/img/icons/logout.svg`}
      alt="disconnect-button"
      onClick={logout}
    />
  );
};

export default Logout;
