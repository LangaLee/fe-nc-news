import { Link } from "react-router-dom";
import Button from "../Reusable-components/Button";
import { useContext } from "react";
import loggedInUserContext from "../context/loggedInContext";
import Divider from "../Reusable-components/Divider";

const Header = () => {
  const { loggedIn } = useContext(loggedInUserContext);

  return (
    <div className="flex  items-center justify-between mb-8">
      <Link to={"/"}>
        <h1 className="text-7xl">NC News</h1>
      </Link>
      <div>
        {!loggedIn.value ? (
          <Link to={"/login"}>
            <Button value={"Sign in"} />
          </Link>
        ) : null}

        {loggedIn.value ? (
          <Link>
            <div className="flex">
              <div>
                <Button value={loggedIn.user} />
              </div>
              <div>
                <img
                  src={loggedIn.profile_pic}
                  alt={`profile picture for the user ${loggedIn.user}`}
                  className=" h-16 w-16 rounded-full "
                />
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
