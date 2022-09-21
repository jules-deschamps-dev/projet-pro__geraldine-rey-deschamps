const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// permet de vérifier que l'utilisateur est bien connecté
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Check User", token);
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("token", "", { maxAge: 1 });
        console.log("erreur !!!");
        res.status(500).json("Vous avez été deconnecté");
      } else {
        let user = await User.findOne({
          where: {
            id: decodedToken.id,
          },
        });
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("non identifié");
    res.locals.user = null;
    res.status(500).json("Vous n'êtes pas identifié");
  }
};

// permet de savoir si le token délivré à l'authentification correspond à celui attribué à la connexion
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Require Auth", token);
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log("id : " + decodedToken.id + " ! ! ! ");
        next();
      }
    });
  } else {
    res.status(500).json("Aucun token trouvé");
  }
};
