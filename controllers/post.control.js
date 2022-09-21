const Post = require("../models/post.model");
const User = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { json } = require("body-parser");
const pipeline = promisify(require("stream").pipeline);
const db = require("../config/db.config");

exports.newPost = (req, res) => {
  let fileName;
  if (req.file) {
    console.log("file !");
    try {
      if (req.file.size > 5120000) throw Error("maxSize");
      if (
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/jpeg" &&
        req.file.mimetype !== "image/png"
      )
        throw Error("invalid file format");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(500).json({ errors });
    }
    fileName = Date.now() + ".jpg";
    console.log(fileName);

    let writeStream = fs.createWriteStream(
      `${__dirname}/../client/public/uploads/${fileName}`
    );
    writeStream.write(req.file.buffer);
    writeStream.on("finish", () => {
      console.log("Image postée");
    });

    writeStream.end();
  } else {
    console.log("/!/ no file");
  }
  Post.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    picture: req.file ? "/uploads/" + fileName : "",
  })
    .then(() => res.status(201).json({ message: "Nouvelle publication !" }))
    .catch((err) => res.status(500).json({ err }));
};

module.exports.getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.status(200).json(posts);
};

module.exports.getOnePost = async (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      postData = {
        title: post.title,
        description: post.description,
        price: post.price,
        picture: post.picture,
      };
      res.status(201).json(postData);
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.updatePost = (req, res) => {
  console.log("!!!");
  console.log("back", req.params.id, req.body);
  Post.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then(res.status(201).json(" Publication mise à jour "))
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deletePost = (req, res) => {
  console.log("back", req.params.id);
  Post.destroy({
    where: { id: req.params.id },
  })
    .then(res.status(200).json(" Publication supprimé ! "))
    .catch((err) => res.status(500).json({ err }));
};

const uploadErrors = (err) => {
  let errors = { format: null, maxSize: null };
  if (err.message.includes("format")) errors.format = "Format incompatible";
  if (err.message.includes("maxSize"))
    errors.maxSize = "Le fichier ne doit pas excéder 512ko";

  return errors;
};

module.exports.handleFile = (req, res) => {
  try {
    if (req.file.size > 512000) throw Error("maxSize");
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png"
    )
      throw Error("invalid file format");
  } catch (err) {
    console.log("ERROR !!!!!");
    const errors = uploadErrors(err);
    return res.status(200).json({ errors });
  }
};
