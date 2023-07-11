import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Challenges = () => {
	const [challenges, setChallenges] = useState([]);
	const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cookies] = useCookies(["jwt"]);
	// Add other necessary state variables for challenge form
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
	useEffect(() => {
		fetchChallenges();
	}, []);

	const fetchChallenges = async () => {
		try {
			const response = await axios.get("https://localhost:7155/api/Challenges");
			setChallenges(response.data);
		} catch (error) {
			// Handle error
		}
	};

	const createChallenge = async (e) => {
		e.preventDefault();
		const newChallenge = {
			name,
			description,
			// Add other necessary challenge properties
		};

		try {
			await axios.post("https://localhost:7155/api/Challenges", newChallenge);
			setName("");
			setDescription("");
			// Clear other form fields
			fetchChallenges();
		} catch (error) {
			// Handle error
		}
	};

	const deleteChallenge = async (challengeId) => {
		try {
			await axios.delete(`https://localhost:7155/api/Challenges/${challengeId}`);
			fetchChallenges();
		} catch (error) {
			// Handle error
		}
	};

	return (
		<div>
			<h1>Challenges</h1>

			{/* Render the list of challenges */}
			{challenges.map((challenge) => (
				<div key={challenge.challengeId}>
					<h3>{challenge.name}</h3>
					<p>{challenge.description}</p>
					{/* Render other challenge properties */}
					<button onClick={() => deleteChallenge(challenge.challengeId)}>
						Delete
					</button>
				</div>
			))}

			{/* Create challenge form */}
			<form onSubmit={createChallenge}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				{/* Add other necessary form fields */}
				<button type="submit">Create Challenge</button>
			</form>
		</div>
	);
};

export default Challenges;
