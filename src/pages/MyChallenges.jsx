import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useCookies } from "react-cookie";
import axios from "axios";

const MyChallenges = () => {
	const [challenges, setChallenges] = useState([]);
	const [selectedChallenge, setSelectedChallenge] = useState(null);
	const [cookies] = useCookies(["jwt"]);
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;

	const handleViewChallenge = (challenge) => {
		console.log("Selected challenge: ", challenge);
		setSelectedChallenge(challenge);
	};

	const onHide = () => {
		setSelectedChallenge(null);
	};

	useEffect(() => {
		const fetchChallenges = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7155/api/Challenges/my-challenges"
				);
				const challengeIds = response.data;
				const challengeDetails = await Promise.all(
					challengeIds.map(async (challengeId) => {
						const challengeResponse = await axios.get(
							`https://localhost:7155/api/Challenges/${challengeId}`
						);
						return challengeResponse.data;
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
				console.log(challengeDetails);
			} catch (error) {
				console.log(error);
			}
		};

		fetchChallenges();
	}, []);

	return (
		<>
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
				<Column field="calories" header="Calories" sortable />
				<Column field="kilometers" header="Kilometers" sortable />
				<Column field="steps" header="Steps" sortable />
				<Column field="startDate" header="Start Date" sortable />
                <Column field="endDate" header="End Date" sortable />
                <Column field="createdBy" header="Created By" sortable />
			</DataTable>
			{selectedChallenge && (
				<Dialog visible={true} onHide={onHide}>
					<h2>{selectedChallenge.value.name}</h2>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div>
							<span>Description: </span>
							<span>{selectedChallenge.value.description}</span>
						</div>
						{selectedChallenge.value.calories !== null && (
							<div>
								<span>Calories: </span>
								<span>{selectedChallenge.value.calories}</span>
							</div>
						)}
						{selectedChallenge.value.kilometers !== null && (
							<div>
								<span>Kilometers: </span>
								<span>{selectedChallenge.value.kilometers}</span>
							</div>
						)}
						{selectedChallenge.value.steps !== null && (
							<div>
								<span>Steps: </span>
								<span>{selectedChallenge.value.steps}</span>
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
				</Dialog>
			)}
		</>
	);
};

export default MyChallenges;
