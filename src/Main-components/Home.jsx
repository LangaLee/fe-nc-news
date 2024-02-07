import { Link } from "react-router-dom";
import Button from "../Reusable-components/Button";
import { useContext, useEffect } from "react";
import urlContext from "../context/urlContext";

const Home = () => {
  const { url, setUrl } = useContext(urlContext);

  useEffect(() => {
    setUrl("/");
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
    </div>
  );
};

export default Home;
