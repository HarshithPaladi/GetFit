import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://localhost:7155/api/weather"
			);
			setWeatherData(response.data);
		} catch (error) {
			console.error("Failed to fetch weather data:", error);
		}
	};

	return (
		<div>
			<h2>Weather</h2>
			{weatherData ? (
				<div>
					<p>Location: {weatherData.location.name}</p>
					<p>Temperature: {weatherData.current.temp_c}°C</p>
					<p>Condition: {weatherData.current.condition.text}</p>
				</div>
			) : (
				<p>Loading weather data...</p>
			)}
		</div>
	);
};

export default Weather;
