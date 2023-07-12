import React, { useEffect, useState } from "react";
import { FaSync } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Spinner, Button } from "react-bootstrap";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { ProgressBar } from "primereact/progressbar";
import { useCookies } from "react-cookie";
import axios from "axios";

const MyChallenges = () => {
	const [challenges, setChallenges] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedChallenge, setSelectedChallenge] = useState(null);
	const [selectedChallengeProgress, setSelectedChallengeProgress] = useState({
		progressValue: 0,
		targetValue: 0,
		progressPercentage: 0,
	});
	const [cookies] = useCookies(["jwt"]);
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;

	const handleViewChallenge = async (challenge) => {
		console.log("Selected challenge: ", challenge);
		setSelectedChallenge(challenge);
		try {
			const response = await axios.get(
				`https://getfitapi.harshithpaladi.dev/api/Challenges/${challenge.value.challengeId}/progress`
			);
			const { progressValue, targetValue, progressPercentage } = response.data;
			// set progressValue, targetValue, and progressPercentage in state
			setSelectedChallengeProgress({
				progressValue,
				targetValue,
				progressPercentage,
			});
			console.log("Selected challenge progress: ", selectedChallengeProgress);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateProgress = async () => {
		try {
			const userId = await getUserId();
			await axios.post(
				`https://getfitapi.harshithpaladi.dev/api/Challenges/${selectedChallenge.value.challengeId}/progress?participantId=${userId}`
			);
			console.log("Progress updated successfully!");

			// Fetch the updated progress data
			const response = await axios.get(
				`https://getfitapi.harshithpaladi.dev/api/Challenges/${selectedChallenge.value.challengeId}/progress`
			);
			const { progressValue, targetValue, progressPercentage } = response.data;

			// Update the state with the updated progress
			setSelectedChallengeProgress({
				progressValue,
				targetValue,
				progressPercentage,
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleRefreshData = () => {
		fetchChallenges();
	};

	const getUserId = async () => {
		try {
			const response = await axios.get(
				"https://getfitapi.harshithpaladi.dev/api/auth/userId",
				{
					headers: {
						Authorization: `Bearer ${cookies.jwt}`,
					},
				}
			);
			const userId = response.data;
			return userId;
		} catch (error) {
			console.error(error);
		}
	};
	const fetchChallenges = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				"https://getfitapi.harshithpaladi.dev/api/Challenges/my-challenges"
			);
			const challengeIds = response.data;
			const challengeDetails = await Promise.all(
				challengeIds.map(async (challengeId) => {
					const challengeResponse = await axios.get(
						`https://getfitapi.harshithpaladi.dev/api/Challenges/${challengeId}`
					);
					const challenge = challengeResponse.data;
					return challenge;
				})
			);
			challengeDetails.forEach((challenge) => {
				challenge.startDate = new Date(challenge.startDate).toDateString(
					"yyyy-MM-dd"
				);
				challenge.endDate = new Date(challenge.endDate).toDateString(
					"yyyy-MM-dd"
				);
			});
			setChallenges(challengeDetails);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchChallenges();
		console.log("Selected challenge progress: ", selectedChallengeProgress);
	}, [selectedChallengeProgress]);

	return (
		<>
			<Button variant="light" onClick={handleRefreshData} disabled={isLoading}>
				{isLoading ? (
					<Spinner animation="border" size="sm" />
				) : (
					<FaSync style={{ verticalAlign: "middle" }} />
				)}
			</Button>
			<DataTable
				value={challenges}
				selectionMode="single"
				onSelectionChange={handleViewChallenge}
				paginator
				rows={5}
				rowsPerPageOptions={[5, 10, 25]}
				stripedRows
				className="p-datatable-gridlines"
				style={{ display: "flex", flexDirection: "column" }}
				sortMode="multiple"
				removableSort
				sortField="endDate"
				sortOrder={1}
			>
				<Column field="name" header="Name" sortable />
				<Column field="description" header="Description" />
				<Column field="challengeType" header="Challenge Type" sortable />
				<Column field="challengeGoal" header="Challenge Goal" sortable />
				<Column field="startDate" header="Start Date" sortable />
				<Column field="endDate" header="End Date" sortable />
				<Column field="createdBy" header="Created By" sortable />
			</DataTable>
			{selectedChallenge && (
				<Dialog
					visible={true}
					onHide={() => setSelectedChallenge(null)}
					header="Challenge Details"
					style={{ width: "50vw", flexDirection: "column", display: "flex" }}
				>
					<h2>{selectedChallenge.value.name}</h2>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div>
							<span>Description: </span>
							<span>{selectedChallenge.value.description}</span>
						</div>
						{selectedChallenge.value.challengeType && (
							<div>
								<span>Challenge Type: </span>
								<span>{selectedChallenge.value.challengeType}</span>
							</div>
						)}
						{selectedChallenge.value.challengeGoal && (
							<div>
								<span>Challenge Goal: </span>
								<span>{selectedChallenge.value.challengeGoal}</span>
							</div>
						)}
						{selectedChallengeProgress && (
							<div>
								<span>Progress: </span>
								<ProgressBar
									value={selectedChallengeProgress.progressPercentage}
									showValue={false}
								/>
								<span>ProgressValue: </span>
								<span>
									{selectedChallengeProgress.progressValue}/
									{selectedChallenge.value.challengeGoal}
								</span>
							</div>
						)}
						<div>
							<span>Start Date: </span>
							<span>{selectedChallenge.value.startDate}</span>
						</div>
						<div>
							<span>End Date: </span>
							<span>{selectedChallenge.value.endDate}</span>
						</div>
						<div>
							<span>Created By: </span>
							<span>{selectedChallenge.value.createdBy}</span>
						</div>
					</div>

					<button onClick={handleUpdateProgress}>Update Progress</button>
				</Dialog>
			)}
		</>
	);
};

export default MyChallenges;
