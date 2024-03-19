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
    console.dir(e.target[0].value);
    e.preventDefault();
    const LoginName = e.target[0].value;
    if (users.some((user) => user.username === LoginName)) {
      users.forEach((user) => {
        if (user.username === LoginName) {
          setLoggedIn({
            value: true,
            user: LoginName,
            profile_pic: user.avatar_url,
          });
          localStorage.user = user;
          localStorage.profile_pic = user.avatar_url;
        }
      });
    }
  };
  return (
    <div className="flex justify-center align-bottom w-screen h-72">
      <form onSubmit={handleLogin} className="flex flex-col w-2/4 mt-48">
        <label>Username</label>
        <input type="text" className=" text-black text-xl" />
        <label>Password</label>
        <input type="password" />
        <button id="">Login</button>
      </form>
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
