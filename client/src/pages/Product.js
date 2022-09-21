import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePost } from "../redux/actions/post.actions";
import Nav from "../components/Nav";
import { isEmpty } from "../assets/Utils";
import AdminPannel from "../components/AdminPannel";
import { UidContext } from "../components/AppContext";

const Product = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer);
  const uid = useContext(UidContext);

  useEffect(() => {
    if (loadPost) {
      dispatch(getOnePost());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);
  return (
    <>
      {uid ? <AdminPannel /> : null}
      <Nav />
      <div className="product-page">
        {!isEmpty(post) && (
          <>
            <div className="md:w-1/2 md:h-full p-4 sm:w-full m-auto">
              <img src={post.picture} alt="" />
            </div>
            <div className="md:w-1/2 md:h-full p-4 sm:w-full sm:m-auto">
              <h2 className="font-bold text-4xl mb-4">{post.title}</h2>
              <p className="mb-4">
                <h3 className="underline"> Descriptif </h3>
                {post.description}
              </p>
              Prix : <span className="">{post.price}</span> €
            </div>
          </>
        )}
        <br />
        <br />
      </div>
    </>
  );
};

export default Product;
