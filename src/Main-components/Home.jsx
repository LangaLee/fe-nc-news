import { Link } from "react-router-dom";
import Button from "../Reusable-components/Button";
import { useContext, useEffect, useState } from "react";
import urlContext from "../context/urlContext";
import getAllArticles from "../api-calls/getArticles";
import Recommended from "../Article-components/Recommended";
import Topics from "./Topics";

const Home = () => {
  const { url, setUrl } = useContext(urlContext);

  const [trending, setTrending] = useState(null);

  useEffect(() => {
    setUrl("/");
    getAllArticles(setTrending, null, "trending");
  }, []);

  return (
    <div>
      <h2 className="text-5xl">Welcome To NC News</h2>
      <div>
        <form></form>
        <label htmlFor="all-articles">Find all articles here 👉 </label>
        <Link to={"/articles"}>
          <Button id="all-articles" value={"All Articles"} />
        </Link>
      </div>
      <div className="flex flex-wrap justify-around mr-4">
        <Topics />
        <Recommended trending={trending} />
      </div>
    </div>
  );
};

export default Home;
