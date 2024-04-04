import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchPage from "./pages/search";
import ResultsPage from "./pages/results";
import "./App.css";
import SignUpModal from "./pages/SignUpModal";
import SignInModal from './pages/SignInModal';
import DeleteUserModal from "./pages/DeleteUserModal";

function ComparePage() {
    return <div>Compare Page</div>;
}

function Home() {
    const BE_BASE_URL = "http://192.9.242.103:8000";

    // User sign up states
    // Password is not required for user sign in
    const [signUpModalActive, setSignUpModalActive] = useState(false);
    const [signInModalActive, setSignInModalActive] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false);

    // If user signed in, store email, if empty, user is not signed in
    const [curUserEmail, setCurUserEmail] = useState(""); 

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

    const handleDeleteUser = async (email: string) => {
        const url = `${BE_BASE_URL}/deleteUser`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            alert(responseData.detail + "User deleted successfully. All user reviews, searches, and compares have been deleted.");
            setDeleteModalActive(false); 
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Computers Galore!</h1>
            <div className="mt-5">
                <Link to="/search">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Search
                    </button>
                </Link>
                <Link to="/compare">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Compare
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
                <button
                onClick={() => setDeleteModalActive(true)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete User ☠️🪦
            </button>
            <DeleteUserModal
                isOpen={deleteModalActive}
                onClose={() => setDeleteModalActive(false)}
                onDeleteUser={handleDeleteUser}
            />
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="results" element={<ResultsPage result={null} />} />
                <Route path="compare" element={<ComparePage />} />
            </Routes>
        </Router>
    );
}

export default App;
