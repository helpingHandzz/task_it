import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTaskeeScheduleThunk, getTaskeeScheduleThunk } from "../store/taskee";
import { format, parseISO, compareAsc, isAfter, isToday } from "date-fns";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";


export default function ViewSked() {
	const dispatch = useDispatch();
	const taskeeId = useSelector((state) => state.auth.user.taskeeId)
	const schedule = useSelector((state) => state.taskee.workSchedule)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTaskeeSchedule, setSelectedTaskeeSchedule] = useState(null);

	const handleDeleteClick = (taskeeId) => {
		setSelectedTaskeeSchedule(taskeeId);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedTaskeeSchedule(null);
	};

	const confirmDelete = () => {
		if (selectedTaskeeSchedule) {
		  dispatch(deleteTaskeeScheduleThunk(selectedTaskeeSchedule))
			.then(() => {
			  closeModal();
			})
			.catch(error => {
			  console.error(error);
			});
		}
	  };
	  

	useEffect(() => {
		if (taskeeId) {
			dispatch(getTaskeeScheduleThunk(taskeeId));
		}	
	}, [dispatch, taskeeId]);

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	function formatDate(dateString) {
		const date = parseISO(dateString);
		return format(date, 'PP');
	  };
	  
	function formatTime(timeString) {
		let match = timeString.match(/T(\d{2}):(\d{2})/);
		if (match) {
		  let hours = parseInt(match[1], 10);
		  let minutes = match[2];
		  let period = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12 || 12; 
		  return `${hours}:${minutes} ${period}`;
		}
		return '';
	  }

	const today = new Date()

	const updatedSchedule = schedule ? schedule.filter((day) => 
		isToday(parseISO(day.date)) || isAfter(parseISO(day.date), today)).sort((firstDate, secondDate) =>
			compareAsc(parseISO(firstDate.date), parseISO(secondDate.date))) : [];

	return (
    <div>
      <h1 className="text-3xl font-bold text-center p-4">Your Schedule</h1>
      {updatedSchedule.map((schedule, index) => (
        <div
          className="scheduleContainer border-4 rounded-lg m-4 p-4 flex items-center justify-between hover:drop-shadow-xl"
          key={index}
        >
          <h3 className="text-lg font-semibold">
            Date: {formatDate(schedule.date)}
          </h3>
          <h4 className="text-md font-semibold">
            Start Time: {formatTime(schedule.startTime)}
          </h4>
          <h4 className="text-md font-semibold">
            End Time: {formatTime(schedule.endTime)}
          </h4>
          <div className="iconContainer flex items-center space-x-6">
            <Link to="/calendar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-pencil-square hover:text-cyan-700 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </Link>
            <svg
              onClick={() => handleDeleteClick(schedule.id)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-trash hover:text-red-500 cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
            <div className="popUp">
              <ConfirmationPopup
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center p-10">
		<Link to="/calendar">
        <button className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded">
          Set More Availability
        </button>
		</Link>
      </div>
    </div>
  );
}
