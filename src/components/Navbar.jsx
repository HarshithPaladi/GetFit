import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="/">GetFit</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbar-nav" />
			<Navbar.Collapse id="navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link href="/login">Login</Nav.Link>
					<Nav.Link href="/register">Register</Nav.Link>
					<Nav.Link href="/gfit">GFit</Nav.Link>
					<Nav.Link href="/challenge">Challenges</Nav.Link>
					<Nav.Link href="/Vitals">Vitals</Nav.Link>
					<Nav.Link href="/challenge/subscribed">My Challenges</Nav.Link>
					<Nav.Link href="/logout">Logout</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AppNavbar;
