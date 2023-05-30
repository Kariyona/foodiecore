import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [first_name, setFirstname] = useState("");
	const [last_name, setLastname] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")

	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, first_name, last_name, city, state));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="signup-form-container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="form-input-container">
				<div className="form-input-field">
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					First Name
					<input
						type="text"
						name="first_name"
						value={first_name}
						onChange={(e) => setFirstname(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					Last Name
					<input
						type="text"
						name="last_name"
						value={last_name}
						onChange={(e) => setLastname(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					City
					<input
						type="text"
						name="city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					State
					<input
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				</div>
				<div className="form-input-field">
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				</div>
				<button className="signup-button" type="submit">Sign Up</button>
				</div>
			</form>
			</div>
		</>
	);
}

export default SignupFormModal;
