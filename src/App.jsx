import { Routes, Route } from "react-router-dom";
import Header from "./Main components/Header";
import Home from "./Main components/Home";
import Articles from "./Article components/Articles";

function App() {
  return (
    <div className="text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
