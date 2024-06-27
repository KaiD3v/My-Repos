import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Repository from "./pages/Repository/Repository";

// pages

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/repository/:repository" element={<Repository />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
