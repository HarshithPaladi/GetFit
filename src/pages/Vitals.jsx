import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const Vitals = () => {
    const [vitalsData, setVitalsData] = useState(null);
    const [cookies] = useCookies(["jwt"]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
                "https://localhost:7155/api/PersonalVitals/fetch-data", {
                    headers: {
                        Authorization: `Bearer ${cookies.jwt}`,
                    },
                }
			);
			const data = response.data;
			setVitalsData(data);
		} catch (error) {
			// Handle error
			console.log(error);
		}
	};

	const displayData = () => {
		if (vitalsData) {
			// Display the fetched data
			console.log(vitalsData);
		} else {
			// No data available
			console.log("No data available");
		}
	};

	return (
		<Container>
			<h1>Vitals Page</h1>
			<Button variant="primary" onClick={fetchData}>
				Fetch Data
			</Button>
			<Button variant="secondary" onClick={displayData}>
				Display Data
			</Button>
		</Container>
	);
};

export default Vitals;
