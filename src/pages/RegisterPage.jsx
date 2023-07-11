import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import {Dialog} from "primereact/dialog"

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		userName: "",
		firstName: "",
		gender: "",
		email: "",
		password: "",
	});
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://localhost:7155/api/auth/register",
				formData
            );
            const { status, data: responseData } = response;
            if (status === 200) {
                setShowModal(true);
            }
            else {
                setError("Failed to register. Please check your input and try again.");
            }
        }
        catch (error) {
			setError("Failed to register. Please check your input and try again.");
		}
	};

	return (
		<Container>
			<h1>Register</h1>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="userName">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						name="userName"
						value={formData.userName}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group controlId="firstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group controlId="gender">
					<Form.Label>Gender</Form.Label>
					<Form.Control
						as="select"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						required
					>
						<option value="">Select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
            <Dialog
				header="Login"
				visible={showModal}
				style={{ width: "90vw" }}
				onHide={() => setShowModal(false)}
            >
                <p>Registration successful</p>
            </Dialog>

		</Container>
	);
};

export default RegisterPage;
