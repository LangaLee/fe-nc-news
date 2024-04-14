import { useContext, useEffect, useState } from "react";
import fetchUsers from "../api-calls/fetchUsers.jsx";
import Button from "../Reusable-components/Button.jsx";
import Divider from "../Reusable-components/Divider.jsx";
import Loading from "./Loading.jsx";
import loggedInUserContext from "../context/loggedInContext.jsx";
import urlContext from "../context/urlContext.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(loggedInUserContext);
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { url, setUrl } = useContext(urlContext);

  useEffect(() => {
    fetchUsers(setUsers, setIsLoading);
    setUrl("/login");
  }, []);

  const handleLogin = (e, profile_pic) => {
    e.preventDefault();
    const LoginName = e.target[0].value;
    if (users.some((user) => user.username === LoginName)) {
      users.forEach((user) => {
        if (user.username === LoginName) {
          setLoggedIn({
            value: true,
            user: LoginName,
            profile_pic: user.avatar_url,
            continue: true,
          });
          localStorage.user = user;
          localStorage.profile_pic = user.avatar_url;
        }
      });
    }
  };
  return loggedIn.value ? (
    loggedIn.continue ? (
      <div className="flex justify-center align-middle mt-40">
        <div className="flex flex-row items-center">
          <div className="flex flex-col">
            <p className="text-2xl mb-4">logging in as {loggedIn.user}</p>
            <img
              className=" rounded-full"
              src={loggedIn.profile_pic}
              alt={`avatar chosed by the user ${loggedIn.user}`}
            />
          </div>
          <div className="ml-8">
            <Link to={localStorage.url}>
              <button
                className="rounded-md border-solid border-2 hover:bg-blue-900 ml-6 text-xl px-2"
                onClick={() => {
                  setLoggedIn((prevState) => {
                    return { ...prevState, continue: false };
                  });
                }}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center align-middle h-72">
        <Link to={localStorage.url}>
          <button
            className="rounded-md border-solid border-2 hover:bg-blue-900 m-4 h-14 text-xl p-2 mt-60"
            onClick={() => {
              setLoggedIn({ value: false });
              localStorage.clear();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    )
  ) : (
    <div className="flex justify-center align-bottom w-screen h-72">
      <form onSubmit={handleLogin} className="flex flex-col w-2/4 mt-48">
        <label>Username</label>
        <input type="text" className=" text-black text-xl" required={true} />
        <label>Password</label>
        <input type="password" />
        <button id="">Login</button>
      </form>
      <Link to={"/register"}>Don't have an account? Register Here</Link>
    </div>
  );
};

// {!isloading ? (
//   <div className=" bg-white">
//     {users.map((user, index) => {
//       return (
//         <nav key={index} className=" text-center">
//           <Divider key={index} />
//           <Link to={"/"}>
//             <button
//               className="m-4"
//               key={user.username}
//               onClick={(e) => {
//                 handleLogin(e, user.avatar_url);
//               }}
//             >
//               {user.username}
//             </button>
//           </Link>
//         </nav>
//       );
//     })}
//     <Divider />{" "}
//   </div>
// ) : (
//   <Loading className=" justify-center" />
// )}

export default Login;
