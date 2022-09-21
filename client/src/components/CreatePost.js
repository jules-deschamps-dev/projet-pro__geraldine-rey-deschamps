import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, newPost } from "../redux/actions/post.actions";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handlePost = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    if (file) data.append("file", file);
    if (file) data.append("picture", picture);

    dispatch(newPost(data));
    dispatch(getPosts());
    window.location.reload();
  };

  const handlePicture = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    const data = new FormData();
    data.append("file", file);
    data.append("picture", picture);
  };

  return (
    <div className="white-layer">
      <div id="new-post-container">
        <div className="flex flex-col m-auto w-5/6 h-5/6">
          <div className="form-element-container">
            <label className="flex w-1/6" htmlFor="title">
              Titre
            </label>
            <input
              name="title"
              id="tile"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-5/6"
            ></input>
          </div>

          <div className="form-element-container h-1/2">
            <label className="flex w-1/6" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="h-full"
            ></textarea>
          </div>

          <div className="flex">
            <label className="flex w-1/6" htmlFor="price">
              Prix
            </label>
            <input
              name="price"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              className="w-1/5"
            ></input>
          </div>

          <div className="flex">
            <label className="flex w-1/6" htmlFor="file">
              Image
            </label>
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png"
              className="flex import-btn"
              onChange={(e) => handlePicture(e)}
            />
          </div>
        </div>

        <div className="btn-send flex flex-col">
          {description || picture ? (
            <>
              <button className="send w-10 m-auto" onClick={handlePost}>
                <img src="./img/icons/circle-check.svg" alt="" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
