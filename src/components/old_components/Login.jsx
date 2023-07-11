import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import HomePage from "./homepage";
import axios from "axios";

const Login = ({ handleLogin }) => {
	const [showModal, setShowModal] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [twofa, setTwofa] = useState("");
	const [show2faScreen, setShow2faScreen] = useState(false);
	const [token, setToken] = useState("");

	const handleLoginFormSubmit = async (e) => {
		e.preventDefault();

		try {
			// Call the login API endpoint with the provided username and password
			const loginResponse = await axios.post(
				"https://localhost:7155/api/auth/login",
				{
					username,
					password,
				}
			);

			// Get the token from the response
			const { token } = loginResponse.data;
			setToken(token);

			// Show the 2FA screen
			setShow2faScreen(true);
		} catch (error) {
			console.error("Failed to perform login verification:", error);
			// Display an error message or handle the failure case
		}
	};

	const handle2faFormSubmit = async (e) => {
		e.preventDefault();

		try {
			// Verify 2FA code (assuming you have an API endpoint for this)
			const twofaVerificationResponse = await axios.post(
				"https://localhost:7155/api/auth/verify2fa",
				{
					userName: username,
					code: twofa,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			// Get status codes from the response
			const { status } = twofaVerificationResponse;
			if (status === 200) {
				console.log("2FA verification successful!");
				<HomePage username={username} />;
				// Hide the 2FA screen
				setShow2faScreen(false);
			} else if (status === 401) {
				console.log("2FA verification failed!");
			}
		} catch (error) {
			console.error("Failed to perform 2FA verification:", error);
		}
	};

	return (
		<div>
			<Dialog
				header="Login"
				visible={showModal}
				style={{ width: "90vw" }}
				onHide={() => setShowModal(false)}
			>
				{show2faScreen ? (
					<form onSubmit={handle2faFormSubmit}>
						<div className="card">
							<div className="flex flex-column align-items-center justify-content-center gap-3 py-5">
								<div className="flex flex-wrap justify-content-center align-items-center gap-2">
									<label htmlFor="twofa" className="w-6rem">
										2FA Code
									</label>
									<InputText
										id="twofa"
										type="text"
										value={twofa}
										onChange={(e) => setTwofa(e.target.value)}
									/>
								</div>
								<Button
									label="Verify 2FA"
									icon="pi pi-check"
									className="w-10rem mx-auto"
									type="submit"
								></Button>
							</div>
						</div>
					</form>
				) : (
					<form onSubmit={handleLoginFormSubmit}>
						<div className="card">
							<div className="flex flex-column align-items-center justify-content-center gap-3 py-5">
								<div className="flex flex-wrap justify-content-center align-items-center gap-2">
									<label htmlFor="username" className="w-6rem">
										Username
									</label>
									<InputText
										id="username"
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div className="flex flex-wrap justify-content-center align-items-center gap-2">
									<label htmlFor="password" className="w-6rem">
										Password
									</label>
									<InputText
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<Button
									label="Login"
									icon="pi pi-user"
									className="w-10rem mx-auto"
									type="submit"
								></Button>
							</div>
						</div>
					</form>
				)}
			</Dialog>
		</div>
	);
};

export default Login;
