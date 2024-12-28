import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
	const { isSearched, searchFilter, setSearchFilter, jobs } =
		useContext(AppContext);

	const [showFilter, setShowFilter] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedLocations, setSelectedLocations] = useState([]);

	const [filteredJobs, setFilteredJobs] = useState(jobs);

	const handleCategoryChange = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const handleLocationChange = (location) => {
		setSelectedLocations((prev) =>
			prev.includes(location)
				? prev.filter((c) => c !== location)
				: [...prev, location]
		);
	};

	useEffect(() => {
		const matchesCategory = (job) =>
			selectedCategories.length === 0 ||
			selectedCategories.includes(job.category);
		const matchesLocation = (job) =>
			selectedLocations.length === 0 ||
			selectedLocations.includes(job.location);
		const matchesTitle = (job) =>
			searchFilter.title === "" ||
			job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
		const matchesSearchLocation = (job) =>
			searchFilter.location === "" ||
			job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

		const newFilteredJobs = jobs
			.slice()
			.reverse()
			.filter(
				(job) =>
					matchesCategory(job) &&
					matchesLocation(job) &&
					matchesTitle(job) &&
					matchesSearchLocation(job)
			);

		setFilteredJobs(newFilteredJobs);
		setCurrentPage(1); // Reset to the first page when filters change
	}, [jobs, selectedCategories, selectedLocations, searchFilter]);

	// Total pages based on filtered jobs length
	const totalPages = Math.ceil(filteredJobs.length / 6);

	return (
		<div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
			{/* Sidebar */}
			<div className="w-full lg:w-1/4 bg-white p-4 shadow rounded">
				{isSearched &&
					(searchFilter.title !== "" || searchFilter.location !== "") && (
						<>
							<h3 className="font-medium text-lg mb-4">Current search</h3>
							<div className="mb-4 text-gray-600 flex flex-wrap gap-2">
								{searchFilter.title && (
									<span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded text-sm">
										{searchFilter.title}
										<img
											onClick={() =>
												setSearchFilter((prev) => ({ ...prev, title: "" }))
											}
											className="cursor-pointer w-4 h-4"
											src={assets.cross_icon}
											alt="Clear"
										/>
									</span>
								)}
								{searchFilter.location && (
									<span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded text-sm">
										{searchFilter.location}
										<img
											onClick={() =>
												setSearchFilter((prev) => ({ ...prev, location: "" }))
											}
											className="cursor-pointer w-4 h-4"
											src={assets.cross_icon}
											alt="Clear"
										/>
									</span>
								)}
							</div>
						</>
					)}
				<button
					onClick={(e) => setShowFilter((prev) => !prev)}
					className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
				>
					{showFilter ? "Close" : "Filters"}
				</button>
				{/* Category Filter */}
				<div className={showFilter ? "" : "max-lg:hidden"}>
					<h4 className="font-medium text-lg py-4">Search by Categories</h4>
					<ul className="space-y-4 text-gray-600">
						{JobCategories.map((category, index) => (
							<li className="flex gap-3 items-center" key={index}>
								<input
									className="scale-125"
									type="checkbox"
									onChange={() => handleCategoryChange(category)}
									checked={selectedCategories.includes(category)}
								/>
								{category}
							</li>
						))}
					</ul>
				</div>

				{/* Location Filter */}
				<div className={showFilter ? "" : "max-lg:hidden"}>
					<h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
					<ul className="space-y-4 text-gray-600">
						{JobLocations.map((location, index) => (
							<li className="flex gap-3 items-center" key={index}>
								<input
									className="scale-125"
									type="checkbox"
									onChange={() => handleLocationChange(location)}
									checked={selectedLocations.includes(location)}
								/>
								{location}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Job Listings */}
			<section className="w-full lg:w-3/4 text-gray-800">
				<h3 className="font-medium text-2xl sm:text-3xl py-2" id="job-list">
					Latest jobs
				</h3>
				<p className="text-sm sm:text-base mb-6">
					Get your desired job from top companies
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredJobs
						.slice((currentPage - 1) * 6, currentPage * 6)
						.map((job, index) => (
							<JobCard key={index} job={job} />
						))}
				</div>
				{/* Pagination */}
				{filteredJobs.length > 0 && (
					<div className="flex items-center justify-center space-x-2 mt-10">
						{/* Previous Page */}
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							className={`p-2 ${
								currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
							}`}
							disabled={currentPage === 1}
						>
							<img src={assets.left_arrow_icon} alt="Previous" />
						</button>
						{/* Page Numbers */}
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentPage(index + 1)}
								className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
									currentPage === index + 1
										? "bg-blue-100 text-blue-500"
										: "text-gray-500"
								}`}
							>
								{index + 1}
							</button>
						))}
						{/* Next Page */}
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							className={`p-2 ${
								currentPage === totalPages
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}
							disabled={currentPage === totalPages}
						>
							<img src={assets.right_arrow_icon} alt="Next" />
						</button>
					</div>
				)}
			</section>
		</div>
	);
};

export default JobListing;
