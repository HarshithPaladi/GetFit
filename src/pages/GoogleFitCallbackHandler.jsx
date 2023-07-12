import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const CallbackPage = () => {
    const [cookies] = useCookies(["jwt"]);
	useEffect(() => {
		// Get the query parameters from the URL
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const scope = urlParams.get("scope");
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
		// Make a GET request to the backend API to get the userId
		axios
			.get("https://getfitapi.harshithpaladi.dev/api/auth/userId")
			.then((response) => {
				const userId = response.data;

				// Make a GET request to the callback API with the parameters and userId
				axios
					.get("https://getfitapi.harshithpaladi.dev/oauth/callback", {
						params: {
							code: code,
							scope: scope,
							userId: userId,
						},
					})
					.then((callbackResponse) => {
						// Handle the response from the callback API
						console.log(callbackResponse.data);
					})
					.catch((callbackError) => {
						// Handle errors from the callback API request
						console.error(callbackError);
					});
			})
			.catch((error) => {
				// Handle errors from the userId API request
				console.error(error);
			});
	}, []);

	return (
		<div>
			<h1>Callback Page</h1>
			<p>Performing callback request...</p>
		</div>
	);
};

export default CallbackPage;
