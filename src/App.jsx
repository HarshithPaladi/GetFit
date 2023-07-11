import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginComponent from "./pages/LoginPage";
import RegisterComponent from "./pages/RegisterPage";
import GFit from "./pages/GFit";
import Challenges from "./pages/Challenges";
import Vitals from "./pages/Vitals";
import MyChallenges from "./pages/MyChallenges";
import Logout from "./pages/Logout";

const ProtectedRoute = ({ element: Element, ...rest }) => {
	const [cookies] = useCookies(["jwt"]);

	return cookies.jwt ? (
		<Route {...rest} element={<Element />} />
	) : (
		<Navigate to="/login" replace={true} />
	);
};

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />

				<Route path="/gfit/*" element={<ProtectedRoute element={GFit} />} />
				<Route
					path="/challenge/*"
					element={<ProtectedRoute element={Challenges} />}
				/>
				<Route path="/vitals/*" element={<ProtectedRoute element={Vitals} />} />
				<Route
					path="/challenge/subscribed/*"
					element={<ProtectedRoute element={MyChallenges} />}
				/>
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</Router>
	);
}

export default App;
