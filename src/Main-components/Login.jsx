import { useContext, useEffect, useState } from "react";
import fetchUsers from "../api-calls/fetchUsers.jsx";
import Button from "../Reusable-components/Button.jsx";
import Divider from "../Reusable-components/Divider.jsx";
import Loading from "./Loading.jsx";
import loggedInUserContext from "../context/loggedInContext.jsx";

const Login = () => {
  const { setLoggedIn } = useContext(loggedInUserContext);
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUsers(setUsers, setIsLoading);
  }, []);

  const handleLogin = (e, profile_pic) => {
    setLoggedIn({ value: true, user: e.target.innerText, profile_pic });
  };
  return (
    <div className="flex flex-col max-w-96">
      {!isloading ? (
        <>
          {users.map((user, index) => {
            return (
              <nav key={index} className=" text-center">
                <Divider key={index} />
                <button
                  className="m-4"
                  key={user.username}
                  onClick={(e) => {
                    handleLogin(e, user.avatar_url);
                  }}
                >
                  {user.username}
                </button>
              </nav>
            );
          })}
          <Divider />{" "}
        </>
      ) : (
        <Loading className=" justify-center" />
      )}
    </div>
  );
};

export default Login;
