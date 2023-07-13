import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";
import { useCookies } from "react-cookie";

const Gfit = () => {
	const [authorizationUrl, setAuthorizationUrl] = useState("");
	const [cookies] = useCookies(["jwt"]);

	useEffect(() => {
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
	}, []); // Empty dependency array to run the effect only once

	return (
		<div
			className="p-d-flex p-ai-center p-jc-center"
			style={{ height: "100vh", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}
		>
			<Card
				title="Google Fit Integration"
				style={{ width: "350px", textAlign: "center" }}
			>
				<Button
					variant="primary"
					label="Connect with Google Fit"
					icon="pi pi-google"
					disabled={!authorizationUrl}
					href={authorizationUrl}
					target="_blank"
				/>
			</Card>
		</div>
	);
};

export default Gfit;
