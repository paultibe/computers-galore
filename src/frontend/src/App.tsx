import { useState } from "react";
// Ensure your project is set up to import CSS files. This line imports the CSS file where Tailwind's directives are placed.
import "./App.css";

function App() {
  // State hooks for future functionality of buttons if needed
  const [searchActive, setSearchActive] = useState(false);
  const [compareActive, setCompareActive] = useState(false);

  // Placeholder functions for button actions
  const handleSearch = () => {
    console.log("Search clicked");
    setSearchActive(!searchActive);
  };

  const handleCompare = () => {
    console.log("Compare clicked");
    setCompareActive(!compareActive);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Computers Galore!</h1>
      <div className="mt-5">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Search
        </button>
        <button
          onClick={handleCompare}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Compare
        </button>
      </div>
    </div>
  );
}

export default App;
