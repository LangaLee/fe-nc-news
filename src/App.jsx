import { Routes, Route } from "react-router-dom";
import Header from "./Main-components/Header";
import Home from "./Main-components/Home";
import Articles from "./Article-components/Articles";
import Article from "./Article-components/Article";
import { useState } from "react";

function App() {
  const [articleId, setArticleId] = useState(null);

  return (
    <div className="text-white">
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
