import { Routes, Route } from "react-router-dom";
import Header from "./Main-components/Header";
import Home from "./Main-components/Home";
import Articles from "./Article-components/Articles";
import Article from "./Article-components/Article";
import { useState } from "react";
import loggedInUserContext from "./context/loggedInContext";
import urlContext from "./context/urlContext";
import Login from "./Main-components/Login";
import errorContext from "./context/error";
import ErrorPage from "./Main-components/ErrorPage";

function App() {
  const [articleId, setArticleId] = useState(null);
  const [loggedIn, setLoggedIn] = useState({ value: false, user: null });
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  // valid urls
  return (
    <div className=" text-white ">
      <loggedInUserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <urlContext.Provider value={{ url, setUrl }}>
          <errorContext.Provider value={{ error, setError }}>
            <Header />
            {error ? (
              <ErrorPage error={error} />
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/" element={<Home />} />
                <Route path="/:article_id" element={<Article />} />
                <Route path="/articles/:topic" element={<Articles />} />
              </Routes>
            )}
          </errorContext.Provider>
        </urlContext.Provider>
      </loggedInUserContext.Provider>
    </div>
  );
}

export default App;
