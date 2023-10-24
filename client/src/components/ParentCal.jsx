import React, { useState } from "react";
import Calendar from "./Calendar";
import TaskeeCalChoices from "./TaskeeCalChoices";

export default function ParentCal() {
	const [showTaskeeCalChoices, setShowTaskeeCalChoices] =
		useState(false);

	const handleDayClick = (day) => {
		setShowTaskeeCalChoices(true);
	};

	return (
		<div>
			<Calendar handleDayClick={handleDayClick} />
			{showTaskeeCalChoices && <TaskeeCalChoices />}
		</div>
	);
}
