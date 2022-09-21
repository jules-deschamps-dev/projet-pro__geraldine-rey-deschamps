import React, { useContext, useState } from "react";
import { UidContext } from "./AppContext";

import { useDispatch } from "react-redux";
import { reload } from "../assets/Utils";
import {
  deletePost,
  getPosts,
  updatePost,
} from "../redux/actions/post.actions";

const Card = ({ card }) => {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [path, setPath] = useState("/product/?id=" + card.id);

  const handleDelete = () => {
    dispatch(deletePost(card.id));
    dispatch(getPosts);
    window.location.reload();
  };

  const showUpdate = () => {
    setPath(null);
    setUpdate(true);
    document.getElementById(
      "thumb-text-container" + card.id
    ).style.backgroundColor = "rgba(255, 255, 255, .9)";
    document.getElementById("thumb-text-container" + card.id).style.transform =
      "perspective(1000px) rotateX(0deg)";
    document.getElementById("thumb-text-container" + card.id).style.border =
      "dotted 6px darkred";
    document.getElementById(
      "thumb-text-container" + card.id
    ).style.borderRadius = "20px";
  };

  const handleUpdate = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    console.log("front", data, title);
    dispatch(updatePost(card.id, title, description));
    dispatch(getPosts);
    window.location.reload();
  };

  const cancelUpdate = () => {
    reload();
    setUpdate(false);
  };

  return (
    <>
      {uid ? (
        <div className="relative">
          <div className="crud-post">
            <img src="./img/icons/pen-circle.svg" alt="" onClick={showUpdate} />
            <img
              src="./img/icons/circle-trash.svg"
              alt=""
              onClick={handleDelete}
            />
          </div>
        </div>
      ) : null}

      <a href={path} className="card">
        <div id={"card" + card.id} className="card-content">
          <div className="thumb-img-container h-full">
            <div
              id={"thumb-text-container" + card.id}
              className="thumb-text-container"
            >
              {update ? (
                <>
                  <div className="h-5/6">
                    <input
                      name="title"
                      defaultValue={card.title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <textarea
                      name="description"
                      className="w-full h-5/6"
                      defaultValue={card.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex flex-row">
                    <img
                      src="./img/icons/circle-xmark.svg"
                      alt=""
                      className="flex m-auto w-8"
                      onClick={cancelUpdate}
                    />
                    <img
                      src="./img/icons/circle-check.svg"
                      alt=""
                      className="flex m-auto w-8"
                      onClick={handleUpdate}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2>{card.title}</h2>
                  <p className="description">{card.description}</p>
                </>
              )}
            </div>
            <img id={card.id} src={card.picture} alt="" className="h-full" />
          </div>
        </div>
      </a>
    </>
  );
};

export default Card;
