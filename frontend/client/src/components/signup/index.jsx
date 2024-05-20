import { useState } from "react"; // Importing useState hook from React for managing component state
import axios from "axios"; // Importing Axios for making HTTP requests
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from React Router for navigation
import styles from "./styles.module.css"; // Importing CSS module for styling

const Signup = () => {
	const [data, setData] = useState({ // State hook to manage form data
		firstName: "",
		lastName: "",
		dob:"",
		email: "",
		password: "",
	});
	const [error, setError] = useState(""); // State hook to manage error message
	const navigate = useNavigate(); // useNavigate hook for programmatic navigation

	const handleChange = ({ currentTarget: input }) => { // Event handler to update form data state on input change
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => { // Event handler for form submission
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const url = "http://localhost:8000/api/users"; // API endpoint for user registration
			const { data: res } = await axios.post(url, data);
			console.log("i am here") // Sending a POST request to register user
			navigate("/login"); // Redirecting to login page after successful registration
			console.log(res.message); // Logging success message
		} catch (error) {
		
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message); // Setting error message if request fails with status between 400 and 500
			}
		}
	};

	return (
		<div className={styles.signup_container}> {/* Container for signup form */}
			<div className={styles.signup_form_container}> {/* Container for form elements */}
				<div className={styles.left}> {/* Left section */}
					<h1>Welcome Back</h1> {/* Heading */}
					<Link to="/login"> {/* Link to login page */}
						<button type="button" className={styles.white_btn}> {/* Button to navigate to login page */}
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}> {/* Right section */}
					<form className={styles.form_container} onSubmit={handleSubmit}> {/* Signup form */}
						<h1>Create Account</h1> {/* Heading */}
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/> {/* Input field for first name */}
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/> {/* Input field for last name */}
								<input
							type="date"
							placeholder="date of birth"
							name="dob"
							onChange={handleChange}
							value={data.dob}
							required
							className={styles.input}
						/>

						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/> {/* Input field for email */}
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/> {/* Input field for password */}
						{error && <div className={styles.error_msg}>{error}</div>} {/* Display error message if any */}
						<button type="submit" className={styles.green_btn}> {/* Submit button */}
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup; // Exporting Signup component
