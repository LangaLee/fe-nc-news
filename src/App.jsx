import { Routes, Route } from "react-router-dom";
import Header from "./Main-components/Header";
import Home from "./Main-components/Home";
import Articles from "./Article-components/Articles";
import Article from "./Article-components/Article";
import { useState } from "react";
import loggedInUserContext from "./context/loggedInContext";
import urlContext from "./context/urlContext";
import Login from "./Main-components/Login";

function App() {
  const [articleId, setArticleId] = useState(null);
  const [loggedIn, setLoggedIn] = useState({ value: false, user: null });
  const [url, setUrl] = useState("");

  return (
    <div className=" text-white ">
      <loggedInUserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <urlContext.Provider value={{ url, setUrl }}>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/" element={<Home />} />
            <Route path="/articles/:topic" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
          </Routes>
        </urlContext.Provider>
      </loggedInUserContext.Provider>
    </div>
  );
}

export default App;
