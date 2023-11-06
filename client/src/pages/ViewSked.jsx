import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTaskeeScheduleThunk } from "../store/taskee";
import { format, parseISO } from "date-fns";

export default function ViewSked() {
	const dispatch = useDispatch();
	const taskeeId = useSelector((state) => state.auth.user.taskeeId)
	console.log(taskeeId)
	const schedule = useSelector((state) => state.taskee.workSchedule)
	console.log(schedule)

	useEffect(() => {
		if (taskeeId) {
			dispatch(getTaskeeScheduleThunk(taskeeId));
		}	
	}, [dispatch, taskeeId]);

	function formatDate(dateString) {
		return format(parseISO(dateString), 'PP');
	}

	function formatTime(dateString) {
		return format(parseISO(dateString), 'p');
	}
	
	return (
		<div>
			<h1>Your Schedule</h1>
			{schedule.map((schedule, index) => (
				<div className="scheduleContainer border-4 rounded-lg m-4" key={index}>
					<h3>Date: {formatDate(schedule.date)}</h3>
					<h4>Start Time: {formatTime(schedule.startTime)}</h4>
					<h4>End Time: {formatTime(schedule.endTime)}</h4>
				</div>
			))}
		</div>
	);
}
