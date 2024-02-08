import { useEffect, useState } from "react";
import getTopics from "../api-calls/getTopics";
import Divider from "../Reusable-components/Divider";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { TabPane } from "react-bootstrap";

const Topics = () => {
  const [topics, setTopics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTopics(setTopics, setIsLoading);
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col ml-4 mt-16">
          <h3 className="mb-8 text-5xl">Article Topics</h3>

          {topics.map((topic) => (
            <div
              className=" flex content-center justify-center "
              key={topic.slug}
            >
              <Link to={`/articles/${topic.slug}`}>
                <button className=" w-40 text-3xl p-6 hover:bg-slate-300 hover:text-black">
                  {topic.slug}
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Topics;
