import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const error = document.getElementById("errors");

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        pseudo,
        password,
      },
    })
      .then((res) => {
        window.location = "/";
        console.log(res);
        document.cookie = "token=" + res.data.token;
      })
      .catch((err) => {
        console.log(err.response.data);
        error.innerHTML = err.response.data.error;
      });
  };

  return (
    <div id="connexionBloc">
      <h1> Connexion </h1>
      <div id="errors" className="errors"></div>
      <form
        action=""
        onSubmit={handleLogin}
        id="login-form"
        className="flex column"
      >
        <div className="flex row">
          <div className="flex column margin txt-right">
            <label htmlFor="text">
              Pseudo
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                required
              />{" "}
            </label>
            <br />
            <label htmlFor="text">
              Mot de passe
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />{" "}
            </label>
          </div>
        </div>
        <div className="margin">
          <input
            type="submit"
            value="Connexion"
            //onClick={connect()}
            id="submitConnexionButton"
            className="flex margin w30"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
