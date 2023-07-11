import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useCookies } from "react-cookie";

const Challenges = () => {
	const [challenges, setChallenges] = useState([]);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showParticipateModal, setShowParticipateModal] = useState(false);
	const [selectedChallenge, setSelectedChallenge] = useState(null);
	const [cookies] = useCookies(["jwt"]);
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.jwt}`;
	const fetchData = async () => {
		try {
			const response = await axios.get("https://localhost:7155/api/challenges");
			setChallenges(response.data);
		} catch (error) {
			console.error(error);
		}
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
		calories: parseInt(formData.get("calories")) || null,
		kilometers: parseInt(formData.get("kilometers")) || null,
		steps: parseInt(formData.get("steps")) || null,
		startDate: formData.get("startDate"),
		endDate: formData.get("endDate"),
		createdBy: "string",
	};

	try {
		const response = await axios.post(
			"https://localhost:7155/api/challenges",
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
				`https://localhost:7155/api/challenges/${challengeId}/participants`
			);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemoveParticipant = async (challengeId) => {
		try {
			await axios.delete(
				`https://localhost:7155/api/challenges/${challengeId}/participants`
			);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteChallenge = async (challengeId) => {
		try {
			await axios.delete(
				`https://localhost:7155/api/challenges/${challengeId}`
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
						<label htmlFor="calories">Calories</label>
						<input
							type="number"
							id="calories"
							name="calories"
							className="form-control"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="kilometers">Kilometers</label>
						<input
							type="number"
							id="kilometers"
							name="kilometers"
							className="form-control"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="steps">Steps</label>
						<input
							type="number"
							id="steps"
							name="steps"
							className="form-control"
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
		const { challengeId } = rowData;

		return (
			<div className="d-flex">
				<button
					className="btn btn-sm btn-primary me-2"
					onClick={() => handleParticipateChallenge(challengeId)}
				>
					Participate
				</button>
				<button
					className="btn btn-sm btn-danger"
					onClick={() => handleRemoveParticipation(challengeId)}
				>
					Remove
				</button>
			</div>
		);
	};


	const renderChallengeDeleteButton = (rowData) => (
		<Button
			variant="danger"
			onClick={() => handleDeleteChallenge(rowData.challengeId)}
		>
			Delete
		</Button>
	);

	return (
		<div>
			<Button variant="primary" onClick={() => setShowCreateModal(true)}>
				Create Challenge
			</Button>
			<DataTable value={challenges} paginator rows={5}>
				<Column field="name" header="Name"></Column>
				<Column field="description" header="Description"></Column>
				<Column field="calories" header="Calories"></Column>
				<Column field="kilometers" header="Kilometers"></Column>
				<Column field="steps" header="Steps"></Column>
				<Column header="Actions" body={renderChallengeActions}></Column>
				<Column header="Delete" body={renderChallengeDeleteButton}></Column>
			</DataTable>
			{renderCreateModal()}
			{renderParticipateModal()}
		</div>
	);
};

export default Challenges;
