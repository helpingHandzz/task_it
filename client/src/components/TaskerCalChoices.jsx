import React from "react";

export default function TaskerCalChoices({
	selectedDay,
	showErrorMessage,
}) {
	const dispatch = useDispatch();

	return (
		<div>
			{selectedDay !== null && (
				<div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b ">
					<div className="px-4">
						<div className="border-b pb-4 border-gray-400 border-dashed flex justify-center items-center text-2xl font-medium">
							<p className="text-xl font-medium pr-10 leading-3 text-gray-500 dark:text-gray-300 ">
								TASK STARTING ADDRESS
							</p>
							<input
								type="text"
								placeholder="123 Main Street"
								className="m-2 w-10"
							/>
						</div>
						<div className="border-b pb-4 border-gray-400 border-dashed pt-5 flex justify-center items-center text-2xl font-medium">
							<p className="text-xl font-medium pr-10 leading-3 text-gray-500 dark:text-gray-300">
								TASK ENDING ADDRESS
							</p>
							<input
								type="text"
								placeholder="123 Main Street"
								className="m-2 w-10 pl-3"
							/>
						</div>
						<div className="border-b pb-4 border-gray-400 border-dashed pt-5 flex justify-center items-center">
							<button
								onClick={handleSetSchedule}
								className="setButton rounded-md text-2xl font-medium bg-blue-500 p-3 text-white hover:drop-shadow-2xl">
								FIND TASKEE
							</button>
						</div>
						{showErrorMessage && (
							<div className="text-red-600 text-center mt-4"></div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
