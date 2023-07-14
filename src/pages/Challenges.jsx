import React, { useEffect, useState } from "react";
import { FaSync } from "react-icons/fa";
import { Card, Modal, Form, Spinner } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";
import "../assets/css/Challenges.css";
import Footer from "../components/Footer";

const Challenges = () => {
	const [challenges, setChallenges] = useState([]);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showParticipateModal, setShowParticipateModal] = useState(false);
	const [selectedChallenge, setSelectedChallenge] = useState(null);
	const [selectedChallenges, setSelectedChallenges] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				"https://getfitapi.harshithpaladi.dev/api/challenges"
			);
			
			const formattedChallenges = response.data.map((challenge) => ({
				...challenge,
				startDateFormatted: new Date(challenge.startDate).toLocaleDateString("en-GB"),
				endDateFormatted: new Date(challenge.endDate).toLocaleDateString("en-GB"),
			}));

			setChallenges(formattedChallenges);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}

		try {
			const myChallengesResponse = await axios.get(
				"https://getfitapi.harshithpaladi.dev/api/challenges/my-challenges"
			);
			const myChallenges = myChallengesResponse.data;
			setSelectedChallenges(myChallenges);
		} catch (error) {
			console.error(error);
		}
	};
	const handleRefreshData = () => {
		fetchData();
	};

	useEffect(() => {
		const userName = localStorage.getItem("userName");
		if (!userName) {
			window.location.href = "https://getfit.harshithpaladi.dev/login";
		}
		else {
			fetchData();
		}
	}, []);

	const handleCreateChallenge = async (event) => {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const challenge = {
			challengeId: "string",
			name: formData.get("name"),
			description: formData.get("description"),
			challengeType: formData.get("challengeType"),
			challengeGoal: formData.get("challengeGoal"),
			startDate: formData.get("startDate"),
			endDate: formData.get("endDate"),
			createdBy: "string",
		};
		console.log("Challenge: ", challenge);
		try {
			setIsLoading(true); 
			const response = await axios.post(
				"https://getfitapi.harshithpaladi.dev/api/challenges",
				challenge
			);
			setChallenges([...challenges, response.data]);
			setShowCreateModal(false);
			await fetchData();
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const handleParticipateChallenge = async (challengeId) => {
		try {
			await axios.post(
				`https://getfitapi.harshithpaladi.dev/api/challenges/${challengeId}/participants`
			);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemoveParticipant = async (challengeId) => {
		try {
			await axios.delete(
				`https://getfitapi.harshithpaladi.dev/api/challenges/${challengeId}/participants`
			);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteChallenge = async (challengeId) => {
		try {
			await axios.delete(
				`https://getfitapi.harshithpaladi.dev/api/challenges/${challengeId}`
			);
			setChallenges(
				challenges.filter((challenge) => challenge.challengeId !== challengeId)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const renderCreateModal = () => (
		<Modal
			show={showCreateModal}
			onHide={() => setShowCreateModal(false)}
			className="create-modal"
		>
			<Modal.Header closeButton>
				<Modal.Title className="modal-title">Create Challenge</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleCreateChallenge}>
					<div className="mb-3">
						<label className="form-label" htmlFor="name">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="description">
							Description
						</label>
						<input
							type="text"
							id="description"
							name="description"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="challengeType">
							Challenge Type
						</label>
						<select
							id="challengeType"
							name="challengeType"
							className="form-control"
							required
						>
							<option value="steps">Steps</option>
							<option value="calories">Calories</option>
							<option value="distance">Distance</option>
						</select>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="challengeGoal">
							Challenge Goal(steps,calories,meters)
						</label>
						<input
							type="number"
							id="challengeGoal"
							name="challengeGoal"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="startDate">
							Start Date
						</label>
						<input
							type="date"
							id="startDate"
							name="startDate"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="endDate">
							End Date
						</label>
						<input
							type="date"
							id="endDate"
							name="endDate"
							className="form-control"
							required
						/>
					</div>

					<Button
						label="Create"
						icon="pi pi-refresh"
						loading={isLoading}
						onClick={() => {
							// Manually submit the form
							document.getElementById("createChallengeForm").submit();
						}}
						iconPos="right"
					/>
				</form>
			</Modal.Body>
		</Modal>
	);

	const renderParticipateModal = () => (
		<Modal
			show={showParticipateModal}
			onHide={() => setShowParticipateModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Participate in Challenge</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to participate in this challenge?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => setShowParticipateModal(false)}
				>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={() => handleParticipateChallenge(selectedChallenge)}
				>
					Participate
				</Button>
			</Modal.Footer>
		</Modal>
	);

	const renderChallengeActions = (rowData) => {
		const { challengeId, challengeType, challengeGoal, createdBy } = rowData;

		if (selectedChallenges.includes(challengeId)) {
			return (
				<div className="d-flex">
					<button
						className="btn btn-sm btn-danger"
						onClick={() => handleRemoveParticipant(challengeId)}
					>
						Remove
					</button>
				</div>
			);
		} else {
			return (
				<div className="d-flex">
					<button
						className="btn btn-sm btn-primary me-2"
						onClick={() => handleParticipateChallenge(challengeId)}
					>
						Participate
					</button>
				</div>
			);
		}
	};

	const renderChallengeDeleteButton = (rowData) => {
		const { createdBy } = rowData;
		if (createdBy === localStorage.getItem("userName")) {
			return (
				<Button
					variant="danger"
					onClick={() => handleDeleteChallenge(rowData.challengeId)}
					severity="danger"
				>
					Delete
				</Button>
			);
		} else {
			return null;
		}
	};

	return (
		<div>
			<Button variant="primary" onClick={() => setShowCreateModal(true)}
				style={{ marginRight: "2rem", marginTop: "1rem" }}
			>
				Create Challenge
			</Button>

			{/* <Button variant="primary" onClick={() => history.push("/challenge/subscribed")}>
				My Challenges
			</Button> */}
			<Button
				label="Refresh"
				icon="pi pi-refresh"
				loading={isLoading}
				onClick={handleRefreshData}
				iconPos="right"
			/>

			<DataTable
				value={challenges}
				paginator
				rows={5}
				selectionMode="single"
				onSelectionChange={handleViewChallenge}
				rowsPerPageOptions={[5, 10, 25]}
				className="p-datatable-gridlines"
				style={{ display: "flex", flexDirection: "column" }}
				sortMode="multiple"
				removableSort
			>
				<Column field="name" header="Name" sortable></Column>
				<Column field="description" header="Description"></Column>
				<Column field="challengeType" header="Challenge Type" sortable></Column>
				<Column field="challengeGoal" header="Challenge Goal" sortable></Column>
				<Column field="startDateFormatted" header="Start Date" sortable sortField="startDate"></Column>
				<Column field="endDateFormatted" header="End Date" sortable sortField="endDate"></Column>
				<Column field="createdBy" header="Created By" sortable></Column>
				<Column header="Actions" body={renderChallengeActions}></Column>
				<Column header="Delete" body={renderChallengeDeleteButton}></Column>
			</DataTable>
			{renderCreateModal()}
			{renderParticipateModal()}
			{selectedChallenge && (
				<Dialog
					visible={true}
					onHide={onHide}
					header="Challenge Details"
					style={{ width: "80vw", flexDirection: "column", display: "flex" }}
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
						<div>
							<span>Start Date: </span>
							<span>{selectedChallenge.value.startDateFormatted}</span>
						</div>
						<div>
							<span>End Date: </span>
							<span>{selectedChallenge.value.endDateFormatted}</span>
						</div>
						<div>
							<span>Created By: </span>
							<span>{selectedChallenge.value.createdBy}</span>
						</div>
					</div>
				</Dialog>
			)}
		</div>
	);
};

export default Challenges;
