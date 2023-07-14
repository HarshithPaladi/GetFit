import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";
import { ProgressBar } from "primereact/progressbar";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
	const [cookies] = useCookies(["jwt"]);
	const [showDialog, setShowDialog] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (!userName) {
            window.location.href = "https://getfit.harshithpaladi.dev/login";
        }
        else {
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
                            localStorage.setItem("googleFitIntegration", "true");
                            // Show the success dialog
                            setSuccess(true);
                            setLoading(false);
                            setShowDialog(true);
                        })
                        .catch((callbackError) => {
                            // Handle errors from the callback API request
                            console.error(callbackError);
                            // Show the error dialog
                            setSuccess(false);
                            setLoading(false);
                            setShowDialog(true);
                        });
                })
                .catch((error) => {
                    // Handle errors from the userId API request
                    console.error(error);
                    // Show the error dialog
                    setSuccess(false);
                    setLoading(false);
                    setShowDialog(true);
                });
        }
	}, []);

	const onHideDialog = () => {
		// Close the dialog
		setShowDialog(false);
		// Navigate to "gfit" component page
        // let navigate = useNavigate();
        // navigate("/gfit");
        window.location.href = "https://getfit.harshithpaladi.dev/gfit";
	};

	return (
		<div>
			<h1>Google Fit OAuth Callback Page</h1>
			{loading ? (
				<ProgressBar mode="indeterminate" style={{ height: "2px" }} />
			) : (
				<p>Success ...</p>
			)}

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
