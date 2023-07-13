import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { FaSync } from "react-icons/fa";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import "../assets/css/Vitals.css";

const Vitals = () => {
	const [steps, setSteps] = useState(null);
	const [distance, setDistance] = useState(null);
	const [calories, setCalories] = useState(null);
	const [cookies] = useCookies(["jwt"]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async (endpoint) => {
		try {
			setIsLoading(true);
			axios.defaults.withCredentials = true;
			axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
			const response = await axios.post(endpoint, {
				headers: {
					Authorization: `Bearer ${cookies.jwt}`,
				},
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
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
		// get number of milliseconds between start and end time
		const bucketDurationMillis = now.getTime() - new Date(startTime).getTime();

		const stepsData = await fetchData(
			`https://getfitapi.harshithpaladi.dev/api/googlefit/steps?startTime=${startTime}&endTime=${endTime}&bucketDurationMillis=${bucketDurationMillis}`
		);
		const distanceData = await fetchData(
			`https://getfitapi.harshithpaladi.dev/api/googlefit/distance?startTime=${startTime}&endTime=${endTime}&bucketDurationMillis=${bucketDurationMillis}`
		);
		const caloriesData = await fetchData(
			`https://getfitapi.harshithpaladi.dev/api/googlefit/calories?startTime=${startTime}&endTime=${endTime}&bucketDurationMillis=${bucketDurationMillis}`
		);

		setSteps(stepsData);
		setDistance(distanceData);
		setCalories(caloriesData);
	};

	useEffect(() => {
		handleFetchData();
	}, []);

	return (
		<Container>
			<h1>Activity</h1>
			<Button
				label="Refresh"
				icon="pi pi-refresh"
				loading={isLoading}
				onClick={handleFetchData}
				iconPos="right"
				rounded
				className="p-button-raised p-button-rounded"
			/>

			<Card>
				<Card.Body>
					<div className="vital">
						<div className="vital-value">{steps ?? "No data"}</div>
						<div className="vital-label">Steps</div>
					</div>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<div className="vital">
						<div className="vital-value">
							{distance ? `${distance} M` : "No data"}
						</div>
						<div className="vital-label">Distance</div>
					</div>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<div className="vital">
						<div className="vital-value">
							{calories ? `${calories} Cal` : "No data"}
						</div>
						<div className="vital-label">Calories</div>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Vitals;
