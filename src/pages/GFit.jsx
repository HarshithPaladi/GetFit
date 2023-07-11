import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const Gfit = () => {
	const [authorizationUrl, setAuthorizationUrl] = useState("");
	const [cookies] = useCookies(["jwt"]);

	useEffect(() => {
		const getAuthorizationUrl = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7155/oauth/authorize",
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
		<Container>
			<h1>Google Fit Integration</h1>
			<Button variant="primary">
				<a href={authorizationUrl} target="_blank">
					Connect with Google Fit
				</a>
				</Button>
		</Container>
	);
};

export default Gfit;
