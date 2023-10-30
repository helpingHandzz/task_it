import React, { useState } from "react";
import TaskeeCalChoices from "./TaskeeCalChoices";
import { useSelector, useDispatch } from "react-redux";
export default function Calendar() {
    const [selectedDates, setSelectedDates] = useState([]);
    const [displayDate, setDisplayDate] = useState(new Date());
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showTaskeeCalChoices, setShowTaskeeCalChoices] = useState(false);
    const taskeeId = useSelector(state => state.auth.user.taskeeId)
    const dispatch = useDispatch();
    const handlePrevMonth = () => {
        setDisplayDate(prevDate => {
            const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            return newDate;
        });
    }
    const handleNextMonth = () => {
        setDisplayDate(prevDate => {
            const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
            return newDate;
        });
    }
    const formatDate = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleDayClick = (day) => {
        const today = new Date();
        const selectedDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        const todayReset = new Date();
        todayReset.setHours(0, 0, 0, 0);
        if (selectedDate >= todayReset) {
            setSelectedDates(prevDates => {
                const dateString = formatDate(selectedDate);
                const existingDateIndex = prevDates.findIndex(d => d.date === dateString);
                if(existingDateIndex > -1){
                    const newDates = [...prevDates];
                    newDates.splice(existingDateIndex, 1)
                    return newDates;
                } else {
                    return [...prevDates, { date: dateString, startTime: '', endTime: ''}];
                }
            });
            setShowTaskeeCalChoices(true);
        }
    }
    const isInPast = (day) => {
        const dateToCheck = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        const todayReset = new Date();
        todayReset.setHours(0, 0, 0, 0);
        return dateToCheck < todayReset;
    };
    const isDateSelected = (day) => {
        const checkDateString = formatDate(new Date(displayDate.getFullYear(), displayDate.getMonth(), day));
        return selectedDates.some(d => d.date === checkDateString);
    }
    const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const firstDayOfWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();
    const today = new Date().getDate();
    return (
        <>
            <div className="flex items-center justify-center py-8 px-4">
                <div className="2xl:w-1/3 xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full shadow-lg">
                    <div className="md:p-16 md:pb-12 p-5 dark:bg-gray-800 bg-white rounded-t">
                        <div className="px-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold dark:text-gray-100 text-gray-800">
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(displayDate)}
                            </h1>
                            <div className="flex items-center text-gray-800 dark:text-gray-100">
                                <svg onClick={handlePrevMonth} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left hover:bg-blue-500 rounded cursor-pointer" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                                <svg onClick={handleNextMonth} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler ml-3 icon-tabler-chevron-right hover:bg-blue-500 rounded cursor-pointer" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-12 overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Sun</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Mon</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Tue</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Wed</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Thu</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Fri</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">Sat</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: Math.ceil((daysArray.length + firstDayOfWeek) / 7) }, (_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {[...Array(7).keys()].map((dayIndex) => {
                                                const day = rowIndex * 7 + dayIndex + 1 - firstDayOfWeek;
                                                const isCurrentMonth = displayDate.getMonth() === new Date().getMonth();
                                                const isCurrentDay = day === today && isCurrentMonth;
                                                return (
                                                    <td key={day}>
                                                        {day > 0 && day <= daysInMonth && (
                                                            <div
                                                            className={
                                                                `px-4 py-4 cursor-pointer flex w-full justify-center rounded
                                                                ${isDateSelected(day) ? 'bg-blue-500' : ''}
                                                                ${isCurrentDay ? 'bg-blue-200' : ''}`
                                                            }
                                                                onClick={() => handleDayClick(day)}
                                                                    >
                                                                <p className={
                                                                     `text-2xl
                                                                     ${isDateSelected(day) ? 'text-white' : 'text-gray-500'}
                                                                     dark:text-gray-100 font-medium
                                                                     ${isInPast(day) ? 'text-red-900 line-through' : ''}`
                                                                }
                                                                    >
                                                                        {day}
                                                                        </p>
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showTaskeeCalChoices && <TaskeeCalChoices taskeeId={taskeeId} selectedDates={selectedDates} showErrorMessage={showErrorMessage} />}
                    </div>
                </div>
            </div>
        </>
    );
}