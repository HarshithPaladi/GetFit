import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Dialog } from "primereact/dialog";

const LoginComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const location = useLocation();
	const [cookies, setCookie] = useCookies(["jwt"]);
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState(null);
	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"https://getfitapi.harshithpaladi.dev/api/auth/login",
				data
			);
			const { status, data: responseData } = response;
			console.log(
				`Status: ${status}\nResponse: ${JSON.stringify(responseData)}`
			);

			if (status === 200 && responseData.TwoFactorEnabled) {
				navigate("/2fa-login");
			} else if (status === 200) {
				console.log("User is authenticated:");
				let userName = responseData.userName;
				localStorage.setItem("userName", userName);
				setCookie(
					"jwt",
					responseData.token,
					{ path: "/" },
					{ httpOnly: true },
					{ secure: true },
					{ sameSite: "none" },
					{ domain: ".harshithpaladi.dev" }
				);
				setCookie(
					"refreshToken",
					responseData.refreshToken,
					{ path: "/" },
					{ httpOnly: true },
					{ secure: true },
					{ sameSite: "none" },
					{ domain: ".harshithpaladi.dev" }
				);
				setMessage("Login successful");
				setShowModal(true);
				// Redirect to referring page if available
				const { state } = location;
				if (state && state.from) {
					navigate(state.from);
				} else {
					navigate("/");
				}
			} else if (status === 400) {
				console.log("User is not authenticated");
				setMessage(
					`Failed to login. Status code: ${status}. Response: ${JSON.stringify(
						responseData
					)}`
				);
				setShowModal(true);
			}
		} catch (error) {
			// Handle error
			console.log(error);
			setMessage(
				"Error: " + error.message + ".\nPlease check your input and try again."
			);
			setShowModal(true);
		}
	};

	return (
		<Container>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						{...register("username", { required: true })}
					/>
					{errors.username && (
						<Alert variant="danger">Username is required</Alert>
					)}
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						{...register("password", { required: true })}
					/>
					{errors.password && (
						<Alert variant="danger">Password is required</Alert>
					)}
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					disabled={Object.keys(errors).length > 0}
				>
					Login
				</Button>
			</Form>
			<Dialog
				header="Login"
				visible={showModal}
				style={{ width: "90vw" }}
				onHide={() => setShowModal(false)}
			>
				<p>{message}</p>
			</Dialog>
		</Container>
	);
};

export default LoginComponent;
