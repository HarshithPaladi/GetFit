import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
	// const username = localStorage.getItem("userName");
	const [username, setUsername] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
	const userName = localStorage.getItem("userName");
	setUsername(userName);
	setIsLoggedIn(!!userName); // Update isLoggedIn state immediately
}, []);

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="/">GetFit</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbar-nav" />
			<Navbar.Collapse id="navbar-nav">
				<Nav className="ml-auto">
					{!isLoggedIn && (
						<>
							<Nav.Link href="/login">Login</Nav.Link>
							<Nav.Link href="/register">Register</Nav.Link>
						</>
					)}
					<Nav.Link href="/gfit">GFit</Nav.Link>
					<Nav.Link href="/challenge">Challenges</Nav.Link>
					<Nav.Link href="/activity-today">Activity</Nav.Link>
					<Nav.Link href="/challenge/subscribed">My Challenges</Nav.Link>
					{isLoggedIn && (
						<>
							<Nav.Link href="/logout">Logout</Nav.Link>
						</>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AppNavbar;
