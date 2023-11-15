import React, { useState } from "react";
import { editTaskThunk } from "../store/task";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TaskerCalChoices({ selectedDates, currentTask }) {
  console.log("currTask", currentTask);
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState({
    hours: "",
    minutes: "",
    timeOfDay: "AM",
  });

  const handleSetSchedule = () => {
    const startHours =
      parseInt(startTime.hours, 10) +
      (startTime.timeOfDay === "PM" && startTime.hours !== "12" ? 12 : 0);
    const startMinutes = parseInt(startTime.minutes, 10);
    const formattedStartTime = `${startHours
      .toString()
      .padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;

    const updatedSelectedDates = selectedDates.map((dateObj) => ({
      ...dateObj,
      startTime: formattedStartTime,
    }));
    console.log("date", updatedSelectedDates[0].startTime);
    dispatch(
      editTaskThunk({
        ...currentTask,
        startTime: updatedSelectedDates[0].startTime,
        date: updatedSelectedDates[0].date,
      })
    );
    console.log(
      "Inside handleSetSchedule, updatedSelectedDates:",
      updatedSelectedDates
    );
  };

  return (
    <div>
      {selectedDates && selectedDates.length > 0 && (
        <div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
          <div className="px-4">
            <div className="border-b pb-4 border-gray-400 border-dashed flex justify-center items-center text-2xl font-medium">
              <p className="text-xl font-medium pr-10 leading-3 text-gray-500 dark:text-gray-300">
                SET START TIME
              </p>
              <input
                type="text"
                placeholder="9"
                className="m-2 w-10 pl-3"
                value={startTime.hours}
                onChange={(e) =>
                  setStartTime({ ...startTime, hours: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="30"
                className="m-2 w-10 pl-1.5"
                value={startTime.minutes}
                onChange={(e) =>
                  setStartTime({ ...startTime, minutes: e.target.value })
                }
              />
              <select
                name="timeOfDay"
                value={startTime.timeOfDay}
                onChange={(e) =>
                  setStartTime({ ...startTime, timeOfDay: e.target.value })
                }
                id="selector"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="flex justify-center items-center mt-5">
              <div onClick={handleSetSchedule}>
                <Link to={"/booking"}>
                  <button className="setButton rounded-md text-2xl font-medium bg-blue-500 p-3 text-white hover:drop-shadow-2xl">
                    CONTINUE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
