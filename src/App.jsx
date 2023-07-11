// import React, { useState, useEffect } from "react";
// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	Link,
// 	Navigate,
// } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import HomePage from "./components/homepage";
// import Login from "./components/login";
// import Register from "./components/register";
// import Weather from "./components/weather";
// import ExploreChallengesPage from "./components/ExploreChallengesPage";
// import "./App.css";
// import VitalsPage from "./components/VitalsPage";
// import GFit from "./pages/GFit";

// const App = () => {
// 	const [user, setUser] = useState(null);
// 	const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

// 	useEffect(() => {
// 		// Check if the user is authenticated on initial load
// 		checkAuthStatus();
// 	}, []);

// 	const checkAuthStatus = async () => {
// 		try {
// 			const response = await axios.get(
// 				"https://localhost:7155/api/auth/check-auth",
// 				{
// 					headers: { Authorization: `Bearer ${cookies.jwt}` },
// 				}
// 			);
// 			console.log("Response:", response);
// 			const { authenticated, user } = response.data;
// 			if (authenticated) {
// 				setUser(user.userId);
// 				console.log("User is authenticated:", user);
// 			}
// 		} catch (error) {
// 			console.error("Failed to check authentication status:", error);
// 		}
// 	};

// 	const handleLogout = async () => {
// 		try {
// 			await axios.post("https://localhost:7155/api/auth/logout");
// 			setUser(null);
// 			removeCookie("jwt");
// 		} catch (error) {
// 			console.error("Failed to logout:", error);
// 		}
// 	};

// 	const handleLogin = async (token) => {
// 		setCookie("jwt", token, { path: "/", httpOnly: true });
// 		checkAuthStatus();
// 	};

// 	const ProtectedRoute = ({ element }) => {
// 		if (user) {
// 			return element;
// 		} else {
// 			return <Navigate to="/login" />;
// 		}
// 	};

// 	return (
// 		<Router>
// 			<Navbar bg="dark" expand="lg" data-bs-theme="dark">
// 				<Container>
// 					<Navbar.Brand as={Link} to="/">
// 						GetFit
// 					</Navbar.Brand>
// 					<Navbar.Toggle aria-controls="navbar" />
// 					<Navbar.Collapse id="navbar">
// 						<Nav className="ml-auto">
// 							<Nav.Link as={Link} to="/weather">
// 								Weather
// 							</Nav.Link>
// 							<Nav.Link as={Link} to="/explore-challenges">
// 								Explore Challenges
// 							</Nav.Link>
// 							<Nav.Link as={Link} to="/Vitals">
// 								Vitals
// 							</Nav.Link>
// 							<Nav.Link as={Link} to="/gfit">
// 								GFit
// 							</Nav.Link>
// 							{!user ? (
// 								<>
// 									<Nav.Link as={Link} to="/login">
// 										Login
// 									</Nav.Link>
// 									<Nav.Link as={Link} to="/register">
// 										Register
// 									</Nav.Link>
// 								</>
// 							) : (
// 								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
// 							)}
// 						</Nav>
// 					</Navbar.Collapse>
// 				</Container>
// 			</Navbar>

// 			<Routes>
// 				<Route path="/" element={<HomePage />} />
// 				<Route path="/login" element={<Login handleLogin={handleLogin} />} />
// 				<Route path="/register" element={<Register />} />
// 				<Route path="/explore-challenges" element={<ExploreChallengesPage />} />
// 				<Route path="/Vitals" element={<VitalsPage />} />
// 				<Route path="/gfit" element={<GFit />} />
// 				<Route
// 					path="/weather"
// 					element={<ProtectedRoute element={<Weather />} />}
// 				/>
// 			</Routes>
// 		</Router>
// 	);
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginComponent from "./pages/LoginPage";
import RegisterComponent from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import GFit from "./pages/GFit";
import Challenges from "./pages/Challenges";
import Vitals from "./pages/Vitals";


function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />
				<Route path="/gfit" element={<GFit />} />
				<Route path="/challenge" element={<Challenges />} />
				<Route path="/Vitals" element={<Vitals />} />
			</Routes>
		</Router>
	);
}

export default App;
