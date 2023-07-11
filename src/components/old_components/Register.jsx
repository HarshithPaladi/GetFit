import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const Register = () => {
	const [showModal, setShowModal] = useState(false);
	const [registerData, setRegisterData] = useState({
		userName: "",
		firstName: "",
		gender: "",
		email: "",
		password: "",
	});

	const handleRegisterFormSubmit = (e) => {
		e.preventDefault();

		// Perform registration logic

		setShowModal(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRegisterData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div>
			<Button label="Register" onClick={() => setShowModal(true)} />

			<Dialog
				header="Header"
				visible={visible}
				style={{ width: "50vw" }}
				onHide={() => setVisible(false)}
			>
				<p className="m-0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</Dialog>
		</div>
	);
};

export default Register;
