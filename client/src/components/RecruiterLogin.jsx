import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
	const [state, setState] = useState("Login"); // Login state toggle
	const [name, setName] = useState(""); // Company name input
	const [password, setPassword] = useState(""); // Password input
	const [email, setEmail] = useState(""); // Email input
	const [image, setImage] = useState(null); // Uploaded image state
	const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false); // Text data submission state

	const { setShowRecruiterLogin } = useContext(AppContext); // Extract from AppContext

	// Handle Form Submission
	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (state === "Sign Up" && !isTextDataSubmitted) {
			setIsTextDataSubmitted(true);
		} else {
			// Implement login/sign-up API logic here
			console.log("Form submitted");
		}
	};

    useEffect(()=>{
        document.body.style.overflow='hidden'
        return ()=>{
            document.body.style.overflow='unset'
        }

    },[])

	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
			<form
				onSubmit={onSubmitHandler}
				className="relative bg-white p-10 rounded-xl text-slate-500 shadow-lg"
			>
				<h1 className="text-center text-2xl text-neutral-700 font-medium">
					Recruiter {state}
				</h1>
				<p className="text-sm mb-4 text-center">
					{state === "Login"
						? "Welcome back! Please sign in to continue."
						: "Create a new account to get started."}
				</p>

				{/* Sign-Up: Upload Section */}
				{state === "Sign Up" && isTextDataSubmitted && (
					<div className="flex items-center gap-4 my-6">
						<label htmlFor="image" className="cursor-pointer">
							<img
								className="w-16 h-16 rounded-full border"
								src={image ? URL.createObjectURL(image) : assets.upload_area}
								alt="Upload logo"
							/>
							<input
								onChange={(e) => setImage(e.target.files[0])}
								type="file"
								id="image"
								hidden
								aria-label="Upload company logo"
							/>
						</label>
						<p>
							Upload Company <br />
							Logo
						</p>
					</div>
				)}

				{/* Input Fields */}
				{(state !== "Login" || !isTextDataSubmitted) && (
					<>
						{/* Company Name Input */}
						{state !== "Login" && (
							<div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
								<img src={assets.person_icon} alt="Company Icon" />
								<input
									className="outline-none text-sm w-full"
									onChange={(e) => setName(e.target.value)}
									value={name}
									type="text"
									placeholder="Company Name"
									required
								/>
							</div>
						)}

						{/* Email Input */}
						<div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
							<img src={assets.email_icon} alt="Email Icon" />
							<input
								className="outline-none text-sm w-full"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								type="email"
								placeholder="Email ID"
								required
							/>
						</div>

						{/* Password Input */}
						<div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
							<img src={assets.lock_icon} alt="Lock Icon" />
							<input
								className="outline-none text-sm w-full"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								type="password"
								placeholder="Password"
								required
							/>
						</div>
					</>
				)}

				{/* Forgot Password Link */}
				{state === "Login" && (
					<p className="text-sm text-blue-600 mt-4 cursor-pointer">
						Forgot password?
					</p>
				)}

				{/* Submit Button */}
				<button
					type="submit"
					className="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
				>
					{state === "Login"
						? "Login"
						: isTextDataSubmitted
						? "Create Account"
						: "Next"}
				</button>

				{/* Toggle Between Login/Sign-Up */}
				<p className="mt-5 text-center">
					{state === "Login" ? (
						<>
							Don't have an account?{" "}
							<span
								className="text-blue-600 cursor-pointer"
								onClick={() => setState("Sign Up")}
							>
								Sign Up
							</span>
						</>
					) : (
						<>
							Already have an account?{" "}
							<span
								className="text-blue-600 cursor-pointer"
								onClick={() => setState("Login")}
							>
								Login
							</span>
						</>
					)}
				</p>

				{/* Close Modal */}
				<img
					onClick={() => setShowRecruiterLogin(false)}
					className="absolute top-5 right-5 cursor-pointer"
					src={assets.cross_icon}
					alt="Close"
					aria-label="Close recruiter login form"
				/>
			</form>
		</div>
	);
};

export default RecruiterLogin;
