import React, { useState, useEffect } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { Card } from "primereact/card";

const VitalsPage = () => {
	const [isRealData, setIsRealData] = useState(false);
	const [vitalsData, setVitalsData] = useState([]);

	useEffect(() => {
		// Fetch initial data
		fetchVitalsData();
	}, []);

	const fetchVitalsData = () => {
		// Implement the logic to fetch the vitals data from the API
		// Use isRealData state to decide whether to fetch real or fake data
		// Update the vitalsData state with the fetched data
		if (isRealData) {
			// Fetch real data from the API
			// Example:
			// fetch("https://api.example.com/vitals")
			//   .then((response) => response.json())
			//   .then((data) => setVitalsData(data))
			//   .catch((error) => console.error("Failed to fetch vitals data:", error));
		} else {
			// Use fake data for testing
			const fakeData = [
				{ date: "2022-10-01", heartRate: 70, steps: 5000, caloriesBurned: 300 },
				{ date: "2022-10-02", heartRate: 75, steps: 6000, caloriesBurned: 350 },
				// Add more fake data entries
			];
			setVitalsData(fakeData);
		}
	};

	return (
		<div className="dashboard-container">
			<h1>Dashboard</h1>
			<div className="toggle-container">
				<ToggleButton
					checked={isRealData}
					onChange={(e) => setIsRealData(e.value)}
					onLabel="Real Data"
					offLabel="Fake Data"
				/>
			</div>
			<div className="vitals-list">
				{vitalsData.map((data, index) => (
					<Card key={index} className="vitals-card">
						<h3>Date: {data.date}</h3>
						<p>Heart Rate: {data.heartRate}</p>
						<p>Steps: {data.steps}</p>
						<p>Calories Burned: {data.caloriesBurned}</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default VitalsPage;
