import { Link } from "react-router-dom";
import Button from "../Reusable-components/Button";
import { useContext, useEffect } from "react";
import loggedInUserContext from "../context/loggedInContext";
import Divider from "../Reusable-components/Divider";
import errorContext from "../context/error";
import { useState } from "react";
import urlContext from "../context/urlContext";
const Header = () => {
  const { loggedIn } = useContext(loggedInUserContext);
  const { url, setUrl } = useContext(urlContext);
  const { setError, error } = useContext(errorContext);
  const [optionsOpen, setOptionsOpen] = useState(false);
  return (
    <div className="flex sticky top-0 items-center h-20 bg-black justify-between overflow-visible">
      <Link to={"/"} onClick={() => setError(false)}>
        <h1 className="text-2xl">NC News</h1>
      </Link>
      <div className="flex flex-row">
        {!loggedIn.value ? (
          url === "/login" ? null : (
            <Link
              to={"/login"}
              onClick={() => {
                setUrl("/login");
              }}
            >
              <Button value={"Sign in"} />
            </Link>
          )
        ) : null}
        {loggedIn.value ? (
          <div className="flex flex-row-reverse  h-20 items-end overflow-visible">
            <div className="mr-2 mt-2 ">
              <img
                onClick={() => setOptionsOpen((prev) => !prev)}
                src={loggedIn.profile_pic}
                alt={`profile picture for the user ${loggedIn.user}`}
                className=" h-16 w-16 rounded-full "
              />
            </div>
            {optionsOpen ? (
              <div
                className="flex flex-col 
               top-20"
              >
                <Link to={"/login"}>
                  <button
                    className="rounded-md border-solid border-2 hover:bg-blue-900 m-4 text-xl p-1"
                    onClick={() => setOptionsOpen((prev) => !prev)}
                  >
                    Change user
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
