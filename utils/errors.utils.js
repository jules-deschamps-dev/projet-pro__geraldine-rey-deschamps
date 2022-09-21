module.exports.signupError = (err) => {
  let error = { pseudo: "", password: "" };
  if ((err.name = "SequelizeUniqueConstraintError")) {
    error.pseudo = "Cet email est déjà utilisé ou est invalide";
  } else if ((err.name = "SequelizeValidationError")) {
    error.pseudo = "Cet email est invalide ou est déjà utilisé";
  }
  return error;
};
