import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchPage from "./pages/search";
import ResultsPage from "./pages/results";
import "./App.css";


function ComparePage() {
  return <div>Compare Page</div>;
}

function Home() {
  return <div className="text-center mt-10">
  <h1 className="text-3xl font-bold">Computers Galore!</h1>
  <div className="mt-5">
    <Link to="/search">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Search
      </button>
    </Link>
    <Link to="/compare">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Compare
      </button>
    </Link>
  </div>
  </div>
}

function App() {

  return (
    <Router>
      <Routes>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="results" element={<ResultsPage result={null}/>} />
          <Route path="compare" element={<ComparePage />} />
      </Routes>
        
    </Router>
  );
}

export default App;
