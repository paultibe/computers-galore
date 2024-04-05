import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchPage from "./pages/search";
import ResultsPage from "./pages/results";
import "./App.css";
import SignUpModal from "./pages/SignUpModal";
import SignInModal from "./pages/SignInModal";
import Aggregate from "./pages/aggregate";

function Home() {
  const BE_BASE_URL = "http://192.9.242.103:8000";

  // User sign up states
  // Password is not required for user sign in
  const [signUpModalActive, setSignUpModalActive] = useState(false);
  const [signInModalActive, setSignInModalActive] = useState(false);

  const [curUserEmail, setCurUserEmail] = useState(""); // If empty, user is not signed in

  const handleSignUp = () => {
    console.log("Sign up clicked");
    setSignUpModalActive(true);
  };

  const handleModalClose = () => {
    console.log("Sign up closed");
    setSignUpModalActive(false);
  };

  const submitSignUp = async (email: string, name: string) => {
    console.log("Sign up submitted", { email, name });
    setSignUpModalActive(false);
    await shootData({ name, email });
  };

  const shootData = async (data: { email: string; name: string }) => {
    const url = `${BE_BASE_URL}/signup`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      alert("Sign up successful! Log in with your email.");
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("Sign up failed. Please try again.");
    }
  };

  const handleLogIn = async (email: string) => {
    const emailExists = await checkUserExists(email);
    if (emailExists) {
      setCurUserEmail(email);
      setSignInModalActive(false);
      console.log("User logged in:", email);
    } else {
      alert("No such user exists.");
    }
  };

  const checkUserExists = async (email: string): Promise<boolean> => {
    const url = `${BE_BASE_URL}/checkUserExists`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData.exists;
    } catch (error) {
      console.error("Check email failed:", error);
      alert("Failed to check if user exists.");
      return false;
    }
  };
// main UI stuff with routing
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Computers Galore!</h1>
      <div className="mt-5">
        <Link to="/search">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Search
          </button>
        </Link>
        <Link to="/aggregate">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Aggregate
          </button>
        </Link>
        <button onClick={() => setSignInModalActive(true)}>Log in 🏃</button>
        <SignInModal
          isOpen={signInModalActive}
          onClose={() => setSignInModalActive(false)}
          onSignIn={handleLogIn}
        />
        <button
          onClick={handleSignUp}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign up 🚀
        </button>
        <SignUpModal
          isOpen={signUpModalActive}
          onClose={handleModalClose}
          onSubmit={submitSignUp}
        />
      </div>
    </div>
  );
}
// specifies mappings between paths and components.
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="results" element={<ResultsPage result={null} />} />
        <Route path="aggregate" element={<Aggregate />} />
      </Routes>
    </Router>
  );
}

export default App;
