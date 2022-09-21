import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/post.actions";
import { isEmpty } from "../assets/Utils";
import Card from "./Card";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <>
      <p className="pt-10 pb-5 pl-10 pr-10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
        deserunt corporis qui vel repellat doloremque quaerat, fuga est
        voluptatum iure beatae aperiam ullam voluptates iusto voluptas. Quia,
        modi incidunt harum repellendus, animi magnam mollitia totam aliquam
        atque officia similique amet odio eveniet ipsam sint facilis
        reprehenderit dolor. Earum velit iure nostrum quis. Ullam praesentium,
        qui, pariatur tenetur porro laboriosam delectus non ducimus repudiandae
        id libero ad quod inventore magni, odit sunt neque mollitia nemo earum.
        Nulla distinctio sequi quam quisquam sint asperiores veniam inventore
        nihil, nobis autem!
      </p>
      <ul className="flex flex-row flex-wrap m-auto pl-10 pr-10 pb-20">
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return (
              <li key={post.id} className="lg:w-1/3 md:w-1/2 sm:h-500 p-5 ">
                <Card card={post} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Thread;
