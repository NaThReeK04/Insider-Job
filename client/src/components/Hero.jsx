import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
	const { setSearchFilter, setIsSearched } = useContext(AppContext);

	const titleRef = useRef(null);
	const locationRef = useRef(null);

	const onSearch = () => {
		setSearchFilter({
			title: titleRef.current.value,
			location: locationRef.current.value,
		});
		setIsSearched(true);
	};

	return (
		<div className="container px-4 sm:px-8 mx-auto my-10">
			<div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-10 sm:py-16 text-center rounded-xl">
				<h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
					Over 10,000+ jobs to apply
				</h2>
				<p className="mb-6 sm:mb-8 max-w-lg mx-auto text-xs sm:text-sm font-light px-3">
					Your Next Big Career Move Starts Right Here - Explore the Best Job
					Opportunities and Take the First Step Toward Your Future!
				</p>
				<div className="flex flex-col sm:flex-row items-center bg-white rounded text-gray-600 max-w-xl mx-4 sm:mx-auto space-y-4 sm:space-y-0 sm:space-x-4 p-3 sm:p-0">
					<div className="flex items-center w-full">
						<img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
						<input
							type="text"
							placeholder="Search for jobs"
							className="text-xs sm:text-sm p-2 rounded outline-none w-full"
							ref={titleRef}
						/>
					</div>
					<div className="flex items-center w-full">
						<img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
						<input
							type="text"
							placeholder="Location"
							className="text-xs sm:text-sm p-2 rounded outline-none w-full"
							ref={locationRef}
						/>
					</div>
					<button
						onClick={onSearch}
						className="bg-blue-600 px-4 sm:px-6 py-2 rounded text-white w-full sm:w-auto"
					>
						Search
					</button>
				</div>
			</div>
			<div className="border border-gray-300 shadow-md mx-2 mt-5 p-4 sm:p-6 rounded-md flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-center sm:gap-10 lg:gap-16">
				<p className="font-medium text-sm sm:text-base">Trusted by</p>
				<div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
					<img className="h-5 sm:h-6" src={assets.microsoft_logo} alt="Microsoft" />
					<img className="h-5 sm:h-6" src={assets.walmart_logo} alt="Walmart" />
					<img className="h-5 sm:h-6" src={assets.accenture_logo} alt="Accenture" />
					<img className="h-5 sm:h-6" src={assets.samsung_logo} alt="Samsung" />
					<img className="h-5 sm:h-6" src={assets.amazon_logo} alt="Amazon" />
					<img className="h-5 sm:h-6" src={assets.adobe_logo} alt="Adobe" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
