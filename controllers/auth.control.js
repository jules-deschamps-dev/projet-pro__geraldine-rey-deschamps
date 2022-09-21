const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { signupError } = require("../utils/errors.utils");

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        pseudo: req.body.pseudo,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((err) => {
          const error = signupError(err);
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
  User.findOne({
    where: {
      pseudo: req.body.pseudo,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          console.log(user.id);
          const token = createToken(user.id);
          console.log("pass");
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 3600 * 24,
          });
          res.status(200).json({ token });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(501).json({ error }));
};

module.exports.logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Disconnected " });
};

const maxAge = "9999999999999";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};
