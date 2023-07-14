import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";
import { useCookies } from "react-cookie";

const Gfit = () => {
	const [authorizationUrl, setAuthorizationUrl] = useState("");
	const [isIntegrationComplete, setIsIntegrationComplete] = useState(false);
	const [cookies] = useCookies(["jwt"]);

	const handleGoogleFitDisconnect = async () => {
		try {
			// Make a request to the revoke endpoint
			await axios.post(
				"https://getfitapi.harshithpaladi.dev/oauth/disconnect",
				null,
				{
					headers: {
						Authorization: `Bearer ${cookies.jwt}`,
					},
					withCredentials: true,
				}
			);

			// Redirect the user to the appropriate route
			window.location.href = "/gfit";
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const userName = localStorage.getItem("userName");
		if (!userName) {
			window.location.href = "https://getfit.harshithpaladi.dev/login";
		} else {
			const getAuthorizationUrl = async () => {
				try {
					const response = await axios.get(
						"https://getfitapi.harshithpaladi.dev/oauth/authorize",
						{
							headers: {
								Authorization: `Bearer ${cookies.jwt}`,
							},
						}
					);
					console.log(response.data.url);
					setAuthorizationUrl(response.data.url);
				} catch (error) {
					// Handle error
					console.log(error);
				}
			};

			getAuthorizationUrl();

			const checkGoogleFitIntegrationStatus = async () => {
				try {
					const response = await axios.get(
						"https://getfitapi.harshithpaladi.dev/oauth/check-status",
						{
							headers: {
								Authorization: `Bearer ${cookies.jwt}`,
							},
							withCredentials: true,
						}
					);
					setIsIntegrationComplete(response.data.gFit_Connected);
				} catch (error) {
					console.error(error);
				}
			};

			checkGoogleFitIntegrationStatus();
		}
	}, []); // Empty dependency array to run the effect only once

	return (
		<div
			className="p-d-flex p-ai-center p-jc-center"
			style={{
				height: "100vh",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card
				title="Google Fit Integration"
				style={{ width: "350px", textAlign: "center" }}
			>
				<Button
					variant="primary"
					label={
						isIntegrationComplete
							? "Reconnect to Google Fit"
							: "Connect to Google Fit"
					}
					icon="pi pi-google"
					disabled={!authorizationUrl}
					link
					onClick={() => {
						window.location.href = authorizationUrl;
					}}
				/>
				{isIntegrationComplete && (
					<Button
						variant="primary"
						label="Disconnect from Google Fit"
						icon="pi pi-google"
						link
						onClick={handleGoogleFitDisconnect}
					/>
				)}
			</Card>
		</div>
	);
};

export default Gfit;
