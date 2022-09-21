import React, { useContext } from "react";
import AdminPannel from "../components/AdminPannel";
import { UidContext } from "../components/AppContext";
import Thread from "../components/Thread";
import Nav from "../components/Nav";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? <AdminPannel /> : null}
      <Nav />
      <div id="thread" className="lg:w-11/12 xl:w-10/12 2xl:w-9/12 m-auto">
        <Thread />
      </div>
    </>
  );
};

export default Home;
