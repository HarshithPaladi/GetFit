import React from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import HomePage from "./Homepage";

const LoginComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(["jwt"]);
	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"https://localhost:7155/api/auth/login",
				data,
			);
			const { status, data: responseData } = response;

			if (status === 200 && responseData.TwoFactorEnabled) {
				navigate("/2fa-login");
			}
			else {
				console.log("User is authenticated:");
				let userName = responseData.userName;
				localStorage.setItem("userName", userName);
				setCookie("jwt", responseData.token, { path: "/" }, { httpOnly: true });
				setCookie("refreshToken", responseData.refreshToken, { path: "/" }, { httpOnly: true });
			}
		} catch (error) {
			// Handle error
			console.log(error);
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
		</Container>
	);
};

export default LoginComponent;
