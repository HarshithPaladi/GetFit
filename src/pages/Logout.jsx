import React, { useEffect } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { useCookies } from "react-cookie";

const Logout = () => {
	const [cookies, , removeCookie] = useCookies(["jwt"]);

	useEffect(() => {
		const logout = async () => {
			try {
				// Make a request to the logout endpoint
				await axios.post(
					"https://getfitapi.harshithpaladi.dev/api/auth/logout",
					null,
					{
						headers: {
							Authorization: `Bearer ${cookies.jwt}`,
						},
						withCredentials: true,
					}
				);

				// Remove the JWT cookie
				removeCookie("jwt");
                removeCookie("refreshToken");
				// Remove the userName from localStorage
                localStorage.removeItem("userName");
                localStorage.removeItem("googleFitIntegration");

				// Redirect the user to the login page or perform any other necessary actions
				// Replace the path with the appropriate route for your application
				window.location.href = "/login";
			} catch (error) {
				console.error(error);
			}
		};

		logout();
	}, [cookies.jwt, removeCookie]);

	return (
		<div className="p-d-flex p-ai-center p-flex-column">
			<h3>Logging out...</h3>
			<Button
				label="Redirecting to Login"
				disabled
				className="p-button-rounded"
			/>
		</div>
	);
};

export default Logout;
