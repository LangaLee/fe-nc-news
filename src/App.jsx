import { Routes, Route } from "react-router-dom";
import Header from "./Main-components/Header";
import Home from "./Main-components/Home";
import Articles from "./Article-components/Articles";
import Article from "./Article-components/Article";
import { useState } from "react";
import loggedInUserContext from "./context/loggedInContext";
import Login from "./Main-components/Login";

function App() {
  const [articleId, setArticleId] = useState(null);
  const [loggedIn, setLoggedIn] = useState({ value: false, user: null });

  return (
    <div className="text-white">
      <loggedInUserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id" element={<Article />} />
        </Routes>
      </loggedInUserContext.Provider>
    </div>
  );
}

export default App;
