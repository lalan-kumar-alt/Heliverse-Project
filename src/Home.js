import React from "react"; import App from "./App"; import Viewteam from "./Viewteam";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function Home() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/viewteam" element={<Viewteam />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
