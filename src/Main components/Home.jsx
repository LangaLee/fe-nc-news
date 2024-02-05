import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2 className="text-5xl">Welcome To NC News</h2>
      <div>
        <form></form>
        <label htmlFor="all-articles">Find all articles here -{">"}</label>
        <Link to={"/articles"}>
          <button id="all-articles">All articles</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
