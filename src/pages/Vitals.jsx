import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const Vitals = () => {
	const [steps, setSteps] = useState(null);
	const [distance, setDistance] = useState(null);
    const [calories, setCalories] = useState(null);
    const [cookies] = useCookies(["jwt"]);

	const fetchData = async (endpoint) => {
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
            const response = await axios.post(endpoint, {
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                },
                withCredentials: true,
            });
			return response.data;
    } 
        catch (error) {
			console.error(error);
		}
	};

	const handleFetchData = async () => {
		const now = new Date();
		const startTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			0,
			0,
			0,
			0
		).toISOString();
		const endTime = now.toISOString();

		const stepsData = await fetchData(
			`https://localhost:7155/api/googlefit/steps?startTime=${startTime}&endTime=${endTime}`
		);
		const distanceData = await fetchData(
			`https://localhost:7155/api/googlefit/distance?startTime=${startTime}&endTime=${endTime}`
		);
		const caloriesData = await fetchData(
			`https://localhost:7155/api/googlefit/calories?startTime=${startTime}&endTime=${endTime}`
		);

		setSteps(stepsData);
		setDistance(distanceData);
		setCalories(caloriesData);
	};


	return (
		<Container>
			<h1>Vitals</h1>
			<Button variant="primary" onClick={handleFetchData}>
				Fetch Data
			</Button>

			{steps && (
				<Card>
					<Card.Body>
						<Card.Title>Steps</Card.Title>
						<Card.Text>{steps}</Card.Text>
					</Card.Body>
				</Card>
			)}

			{distance && (
				<Card>
					<Card.Body>
						<Card.Title>Distance</Card.Title>
						<Card.Text>{distance}</Card.Text>
					</Card.Body>
				</Card>
			)}

			{calories && (
				<Card>
					<Card.Body>
						<Card.Title>Calories</Card.Title>
						<Card.Text>{calories}</Card.Text>
					</Card.Body>
				</Card>
			)}
		</Container>
	);
};

export default Vitals;