import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const ExploreChallengesPage = () => {
	const handleJoinChallenge = (challengeId) => {
		// Implement the logic for joining a challenge
		console.log("Joining challenge:", challengeId);
	};

	return (
		<div className="challenges-container">
			<h1>Explore Challenges</h1>
			<div className="challenges-list">
				<Card title="Challenge 1" className="challenge-card">
					<p>Description of challenge 1.</p>
					<Button
						label="Join Challenge"
						className="p-button-raised p-button-lg"
						onClick={() => handleJoinChallenge(1)}
					/>
				</Card>
				<Card title="Challenge 2" className="challenge-card">
					<p>Description of challenge 2.</p>
					<Button
						label="Join Challenge"
						className="p-button-raised p-button-lg"
						onClick={() => handleJoinChallenge(2)}
					/>
				</Card>
				{/* Add more challenge cards here */}
			</div>
		</div>
	);
};

export default ExploreChallengesPage;
