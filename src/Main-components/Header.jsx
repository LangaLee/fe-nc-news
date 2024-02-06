import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Link to={"/"}>
        <h1 className="text-7xl">NC News</h1>
      </Link>
      <div>
        <button>Sign in</button>
        <button>profile</button>
      </div>
    </div>
  );
};

export default Header;
