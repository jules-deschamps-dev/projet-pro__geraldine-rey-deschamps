import React, { useState } from "react";

const Nav = () => {
  const [path, setPath] = useState("");
  const [fixPath, setFixPath] = useState(true);

  return (
    <>
      {fixPath &&
        (document.location.href.includes("/product/?id=")
          ? setPath("/")
          : setPath("/"),
        setFixPath(false))}
      <nav className="z-10 flex h-16 w-full bg-white pb-1 border-solid border-black border-b-2">
        {document.location.href.includes("/product/") ? (
          <a href={path} className="flex flex left-10 h-full w-20">
            <div className="little-arrow flex m-auto"></div>
          </a>
        ) : null}

        <h1 className="m-auto text-2xl"> Géraldine Rey-Deschamps</h1>

        <div className="flex flex-row ml-auto h-full p-4">
          <a href="https://www.instagram.com/l.univers.du.papier.marbre/">
            <img
              src={`${process.env.REACT_APP_CLIENT_URL}/img/icons/logo_instagram.png`}
              alt="instagram Géraldine Rey Deschamps"
              className="h-full m-auto"
            />
          </a>
          {/*
          <img
            src={`${process.env.REACT_APP_CLIENT_URL}/img/icons/logo_facebook.jpg`}
            alt="facebook Géraldine Rey Deschamps"
            className="h-3/4 m-auto"
          />
          */}
        </div>
      </nav>
    </>
  );
};

export default Nav;
