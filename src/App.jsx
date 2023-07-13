import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import LoginComponent from "./pages/LoginPage";
import RegisterComponent from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import GFit from "./pages/GFit";
import Challenges from "./pages/Challenges";
import Vitals from "./pages/Vitals";
import MyChallenges from "./pages/MyChallenges";
import Logout from "./pages/Logout";
import CallbackPage from "./pages/GoogleFitCallbackHandler";
import "./App.css";


function App() {
	return (
		<Router>
			<AppNavbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />
				<Route path="/gfit" element={<GFit />} />
				<Route path="/challenge" element={<Challenges />} />
				<Route path="/Vitals" element={<Vitals />} />
				<Route path="/challenge/subscribed" element={<MyChallenges />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/googlefit/callback" element={<CallbackPage />} />
			</Routes>
		</Router>
	);
}

export default App;
