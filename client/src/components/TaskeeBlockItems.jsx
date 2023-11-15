import { useState } from "react";
import ProfilePopup from "./ProfilePopup";
import { useDispatch } from "react-redux";
import { editTaskThunk } from "../store/task";
import { useSelector } from "react-redux";
import CalendarPopup from "./CalendarPopup";

function TaskeeBlockItems({ taskee }) {
  const [profileButtonPopup, setProfileButtonPopup] = useState(false);
  const [calendarButtonPopup, setCalendarButtonPopup] = useState(false);
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.task.postedTask);

  const handleUpdateTask = () => {
    dispatch(
      editTaskThunk({
        ...currentTask,
        assignedTo: taskee.id,
        isAssigned: true,
      })
    );
  };

  return (
    <div
      key={taskee.id}
      className="border-2 rounded my-5 mx-5 min-h-min lg:w-full lg:mr-5 bg-white shadow-md"
    >
      <div className="h-1/2 w-full flex justify-around sm:justify-normal">
        <div className="text-center flex px-3 items-center sm:mb-4 mt-4">
          <img
            src={taskee.photo}
            alt={taskee.lName}
            className="rounded-full h-30 w-36 lg:w-48 lg:h-48"
          />
        </div>
        <div className="flex flex-col justify-around mt-3 sm:mr-16 sm:ml-24 sm:justify-between">
          <div className="sm:flex">
            <h3 className="text-xl lg:text-2xl font-bold">
              {taskee.fName} {taskee.lName}
            </h3>
            <h3 className="text-xl lg:text-2xl pt-3 sm:pt-0 sm:ml-10">
              ${taskee.Skills.map((skill) => skill.price) / 100} / hr
            </h3>
          </div>
          <div className="py-7 flex">
            <h3 className="font-bold text-xl mr-3">
              {(
                taskee.TaskeeReview.reduce(
                  (acc, curr) => (acc += curr.rating),
                  0
                ) / taskee.TaskeeReview.length
              ).toFixed(1)}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button
            onClick={() => setProfileButtonPopup(true)}
            className="rounded-full bg-cyan-700 text-white font-bold hover:bg-cyan-900 mb-2 mr-3 py-2 w-40"
          >
            View Profile
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col h-1/2">
        <div className="bg-slate-200 mx-3 rounded h-32">
          <h3 className="pt-2 text-xl p-2">Experience:</h3>
          <p className="p-2">
            {taskee.Skills.map((skill) => skill.experience)}
          </p>
        </div>
        <div onClick={handleUpdateTask}>
          <button
            className="rounded-full bg-cyan-700 text-white font-bold hover:bg-cyan-900 py-2 px-5 my-3 mx-3"
            onClick={() => setCalendarButtonPopup(true)}
          >
            Select Taskee
          </button>
        </div>
      </div>
      <ProfilePopup
        trigger={profileButtonPopup}
        setTrigger={setProfileButtonPopup}
      >
        <div className="flex">
          <img
            src={taskee.photo}
            alt={taskee.lName}
            className="rounded-full pt-5 pl-5 h-44 w-44"
          />
          <div className="ml-10">
            <h3 className="text-2xl font-bold pt-5">
              {taskee.fName} {taskee.lName}
            </h3>
            <h3 className="text-2xl lg:text-2xl pt-7">
              ${taskee.Skills.map((skill) => skill.price) / 100} / hr
            </h3>
            <div className="pt-7 flex">
              <h3 className="font-bold text-xl mr-3">
                {(
                  taskee.TaskeeReview.reduce(
                    (acc, curr) => (acc += curr.rating),
                    0
                  ) / taskee.TaskeeReview.length
                ).toFixed(1)}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-slate-200 mx-3 rounded h-32">
          <h3 className="mt-10 text-xl p-2">Experience:</h3>
          <p className="p-2">
            {taskee.Skills.map((skill) => skill.experience)}
          </p>
        </div>
        <div className="bg-slate-200 mx-3 rounded h-min mb-8">
          <h3 className="mt-10 text-xl p-2">Reviews:</h3>
          {taskee.TaskeeReview.map((review) => (
            <div key={review.id} className="pl-5 pb-7">
              <h3 className="text-xl font-bold">
                {review.tasker.fName} {review.tasker.lName}
              </h3>
              <div className="pt-7 flex">
                <h3 className="font-bold text-xl mr-3">
                  {review.rating.toFixed(1)}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="pt-2">{review.date.split("T")[0]}</h3>
              <p className="pt-2">{review.text}</p>
            </div>
          ))}
        </div>
      </ProfilePopup>
      <CalendarPopup
        trigger={calendarButtonPopup}
        setTrigger={setCalendarButtonPopup}
        currentTask={currentTask}
      ></CalendarPopup>
    </div>
  );
}

export default TaskeeBlockItems;
