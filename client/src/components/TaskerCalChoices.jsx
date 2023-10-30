import React from "react";

export default function TaskerCalChoices() {
	const [selectedDates, setSelectedDates] = useState(null);

	const handleSetSchedule = () => {
        console.log("Selected Dates:", selectedDates);
		
    };

	const handleDateChange = (date) => {
        setSelectedDates(date);
    };
	return (
		<div>
			{selectedDates !== null && (
				<div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
					<div className="px-4">
						<div className="border-b pb-4 border-gray-400 border-dashed flex justify-center items-center text-2xl font-medium">
							<p className="text-xl font-medium pr-10 leading-3 text-gray-500 dark:text-gray-300">SET START TIME</p>
							<input type="text" placeholder="9" className="m-2 w-10 pl-3" value={startTime.hours} onChange={(e) => setStartTime({ ...startTime, hours: e.target.value })} />
							<input type="text" placeholder="30" className="m-2 w-10 pl-1.5" value={startTime.minutes} onChange={(e) => setStartTime({ ...startTime, minutes: e.target.value })} />
							<select name="timeOfDay" id="selector">
								<option value="AM">AM</option>
								<option value="PM">PM</option>
							</select>
						</div>
						<div>
							<button
								onClick={handleSetSchedule}
								className="setButton rounded-md text-2xl font-medium bg-blue-500 p-3 text-white hover:drop-shadow-2xl">
								CONTINUE
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
