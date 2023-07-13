import React, { useEffect, useState } from "react";
import { FaSync } from "react-icons/fa";
import { Card, Button, Modal, Form, Spinner } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";

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
			setChallenges(response.data);
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
		fetchData();
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

		try {
			const response = await axios.post(
				"https://getfitapi.harshithpaladi.dev/api/challenges",
				challenge
			);
			setChallenges([...challenges, response.data]);
			setShowCreateModal(false);
		} catch (error) {
			console.error(error);
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
		<Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Create Challenge</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleCreateChallenge}>
					<div className="mb-3">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="challengeType">Challenge Type</label>
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
						<label htmlFor="challengeGoal">
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
						<label htmlFor="startDate">Start Date</label>
						<input
							type="date"
							id="startDate"
							name="startDate"
							className="form-control"
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="endDate">End Date</label>
						<input
							type="date"
							id="endDate"
							name="endDate"
							className="form-control"
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Create
					</button>
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
			<Button variant="primary" onClick={() => setShowCreateModal(true)}>
				Create Challenge
			</Button>

			{/* <Button variant="primary" onClick={() => history.push("/challenge/subscribed")}>
				My Challenges
			</Button> */}
			<Button variant="light" onClick={handleRefreshData} disabled={isLoading}>
				{isLoading ? (
					<Spinner animation="border" size="sm" />
				) : (
					<FaSync style={{ verticalAlign: "middle" }} />
				)}
			</Button>

			<DataTable
				value={challenges}
				paginator
				rows={5}
				selectionMode="single"
				onSelectionChange={handleViewChallenge}
				rowsPerPageOptions={[5, 10, 25]}
				stripedRows
				className="p-datatable-gridlines"
				style={{ display: "flex", flexDirection: "column" }}
				sortMode="multiple"
				removableSort

			>
				<Column field="name" header="Name" sortable></Column>
				<Column field="description" header="Description"></Column>
				<Column field="challengeType" header="Challenge Type" sortable></Column>
				<Column field="challengeGoal" header="Challenge Goal" sortable></Column>
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
		</div>
	);
};

export default Challenges;
