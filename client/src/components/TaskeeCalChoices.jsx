import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTaskeeScheduleThunk } from "../store/taskee";

export default function TaskeeCalChoices({
	selectedDay,
	showErrorMessage,
}) {
	const dispatch = useDispatch();
	const [startTime, setStartTime] = useState({
		hours: "",
		minutes: "",
		timeOfDay: "AM",
	});
	const [endTime, setEndTime] = useState({
		hours: "",
		minutes: "",
		timeOfDay: "AM",
	});

	const handleSetSchedule = () => {
		const startHours =
			parseInt(startTime.hours, 10) +
			(startTime.timeOfDay === "PM" ? 12 : 0);
		const startMinutes = parseInt(startTime.minutes, 10);
		const endHours =
			parseInt(endTime.hours, 10) +
			(endTime.timeOfDay === "PM" ? 12 : 0);
		const endMinutes = parseInt(endTime.minutes, 10);

		const workSchedule = `${startHours
			.toString()
			.padStart(2, "0")}:${startMinutes
			.toString()
			.padStart(2, "0")} - ${endHours
			.toString()
			.padStart(2, "0")}:${endMinutes
			.toString()
			.padStart(2, "0")}`;

		dispatch(
			postTaskeeScheduleThunk(taskeeId, workSchedule)
		);
	};

	return (
		<div>
			{selectedDay !== null && (
				<div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b ">
					<div className="px-4">
						<div className="border-b pb-4 border-gray-400 border-dashed flex justify-center items-center text-2xl font-medium">
							<p className="text-xl font-medium pr-10 leading-3 text-gray-500 dark:text-gray-300 ">
								SET START TIME
							</p>
							<input
								type="text"
								placeholder="9"
								className="m-2 w-10"
							/>
							<input
								type="text"
								placeholder="30"
								className="m-2 w-10"
							/>
							<select
								name="timeOfDay"
								id="selector">
								<option value="AM">AM</option>
								<option value="PM">PM</option>
							</select>
						</div>
						<div className="border-b pb-4 border-gray-400 border-dashed pt-5 flex justify-center items-center text-2xl font-medium">
							<p className="text-xl font-medium pr-10 leading-3 text-gray-500 dark:text-gray-300">
								SET END TIME
							</p>
							<input
								type="text"
								placeholder="9"
								className="m-2 w-10 pl-3"
							/>
							<input
								type="text"
								placeholder="30"
								className="m-2 w-10 pl-1.5"
							/>
							<select
								name="timeOfDay"
								id="selector">
								<option value="PM">PM</option>
								<option value="AM">AM</option>
							</select>
						</div>
						<div className="border-b pb-4 border-gray-400 border-dashed pt-5 flex justify-center items-center">
							<button
								onClick={handleSetSchedule}
								className="setButton rounded-md text-2xl font-medium bg-blue-500 p-3 text-white hover:drop-shadow-2xl">
								SET SCHEDULE
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
