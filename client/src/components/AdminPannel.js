import React, { useState } from "react";
import Logout from "../pages/Logout";
import CreatePost from "./CreatePost";

const AdminPannel = () => {
  const [createPost, setCreatePost] = useState(false);

  const showPostCreator = () => {
    if (createPost === false) setCreatePost(true);
    else setCreatePost(false);
  };

  return (
    <div className="admin-pannel-container">
      <aside className="admin-pannel">
        {!createPost ? (
          <>
            <img
              src={`${process.env.REACT_APP_CLIENT_URL}/img/icons/circle-plus.svg`}
              alt=""
              className="m-auto flex"
              onClick={showPostCreator}
            />
            <Logout />
          </>
        ) : (
          <img
            src={`${process.env.REACT_APP_CLIENT_URL}/img/icons/xmark.svg`}
            alt=""
            className="m-auto flex"
            onClick={showPostCreator}
          />
        )}
      </aside>

      {createPost ? <CreatePost /> : null}
    </div>
  );
};

export default AdminPannel;
