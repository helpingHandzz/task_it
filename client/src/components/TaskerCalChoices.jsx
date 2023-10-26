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
				<div>
					<button
						onClick={handleSetSchedule}
						className="setButton rounded-md text-2xl font-medium bg-blue-500 p-3 text-white hover:drop-shadow-2xl">
						CONTINUE
					</button>
				</div>

			)}
		</div>
	);
}
