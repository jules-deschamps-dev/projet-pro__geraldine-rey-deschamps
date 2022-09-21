import React, { useEffect, useState } from "react";
import axios from "axios";
import Routes from "./components/Routes";
//import { useDispatch } from "react-redux";
//import { getUser } from "./redux/actions/user.actions";
import { UidContext } from "./components/AppContext";

const App = () => {
  const [uid, setUid] = useState(null); // where uid is UserID
  //const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}token`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data.id);
          console.log("uid ", res);
        })
        .catch((err) => console.log("No token", err));
    };

    fetchToken();
    //if (uid) dispatch(getUser(uid));
  });
  return (
    <>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </>
  );
};

export default App;
