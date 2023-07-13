import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";
import { ProgressBar } from "primereact/progressbar";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

const CallbackPage = () => {
	const [cookies] = useCookies(["jwt"]);
	const [showDialog, setShowDialog] = useState(false);
	const [success, setSuccess] = useState(false);

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

						// Show the success dialog
						setSuccess(true);
						setShowDialog(true);
					})
					.catch((callbackError) => {
						// Handle errors from the callback API request
						console.error(callbackError);
						// Show the error dialog
						setSuccess(false);
						setShowDialog(true);
					});
			})
			.catch((error) => {
				// Handle errors from the userId API request
				console.error(error);
				// Show the error dialog
				setSuccess(false);
				setShowDialog(true);
			});
	}, []);

	const onHideDialog = () => {
		// Close the dialog
		setShowDialog(false);
		// // Close the window after the dialog is closed
		// window.close();
	};

	return (
		<div>
			<h1>Callback Page</h1>
			<p>Performing callback request...</p>

			<Dialog
				visible={showDialog}
				onHide={onHideDialog}
				className={success ? "success-dialog" : "error-dialog"}
				modal
				draggable={false}
				resizable={false}
				closable={true}
				style={{ width: "300px", textAlign: "center" }}
			>
				<div>
					{success ? (
						<FaCheck size={40} style={{ color: "green" }} />
					) : (
						<FaExclamationTriangle size={40} style={{ color: "red" }} />
					)}
				</div>
				<div style={{ marginTop: "10px" }}>
					{success ? "Google Fit integration success!" : "Error occurred."}
				</div>
			</Dialog>
		</div>
	);
};

export default CallbackPage;
