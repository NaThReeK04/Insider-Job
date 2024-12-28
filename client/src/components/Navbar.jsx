import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
	const { openSignIn } = useClerk();
	const { user } = useUser();

	const navigate = useNavigate();

	const {setShowRecruiterLogin}=useContext(AppContext)

	return (
		<div className="shadow py-4 bg-white">
			<div className="container px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center">
				{/* Logo */}
				<img
					onClick={() => navigate("/")}
					className=" cursor-pointer h-8 sm:h-10"
					src={assets.logo}
					alt="Company Logo"
				/>

				{/* Navigation and User Actions */}
				<div className="flex items-center gap-3 sm:gap-6">
					{user ? (
						<div className="flex items-center gap-2 text-sm sm:text-base">
							<Link
								to="/applications"
								className="text-gray-600 hover:underline"
							>
								Applied Jobs
							</Link>
							<p>|</p>
							<p className="max-sm:hidden">
								Hi, {user.firstName + " " + user.lastName}
							</p>
							<UserButton />
						</div>
					) : (
						<div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
							<button onClick={e=>setShowRecruiterLogin(true)} className="text-gray-600 hover:underline">
								Recruiter Login
							</button>
							<button
								onClick={(e) => openSignIn()}
								className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full"
							>
								Login
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
