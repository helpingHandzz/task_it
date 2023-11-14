import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTaskeeReviewThunk } from "../store/taskee";
import ReviewByTaskerPopup from "./ReviewByTaskerPopup";

function TaskerAccountCompleted({ task, forceUpdate }) {
  const dispatch = useDispatch();
  const [reviewPopupButton, setReviewPopupButton] = useState(false);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = task.date?.split("-");

  if (!formattedDate) {
    return <div>LOADING...</div>;
  }

  if (!task.taskee.Skills[0].price) {
    return <div>LOADING...</div>;
  }

  const amPm = Number(task.startTime?.slice(0, 2)) <= 12 ? "A.M." : "P.M.";

  const formattedTime =
    Number(task.startTime?.slice(0, 2)) <= 12
      ? task.startTime
      : Number(task.startTime?.slice(0, 2)) -
        12 +
        ":" +
        task.startTime?.slice(3, 5);

  const vehicleRequired = task.vehicleRequired ? "Yes" : "No";

  const currentDate = new Date();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(
      postTaskeeReviewThunk({
        taskId: task.id,
        taskeeId: task.taskee.id,
        rating: +rating,
        reviewedBy: task.taskerId,
        text: reviewText,
        date: currentDate.toISOString(),
      })
    );
    setReviewPopupButton(false);
    forceUpdate();
  };

  // const filteredPrice = task.taskee.Skills.filter(
  //   (skill) => skill.subcategoryId === task.subcategoryId
  // );

  // const price = filteredPrice[0].price;
  // console.log("test", price);

  return (
    <div
      key={task.id}
      className="border shadow-md bg-white m-4 p-3 md:w-[45%] lg:w-[30%]"
    >
      <h3 className="text-xl font-bold pb-5">{task.subcategory.subName}</h3>
      {task.taskee && (
        <div>
          <div className="flex">
            <img src={task.taskee.photo} className="rounded-full mr-8" />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">
                {task.taskee.fName} {task.taskee.lName}
              </h3>
              <h3>
                ${" "}
                {(
                  task.taskee.Skills.filter(
                    (skill) => skill.subcategoryId === task.subcategoryId
                  )[0].price / 100
                ).toFixed(2)}{" "}
                / hr
              </h3>
            </div>
          </div>
          <h3 className="font-bold pt-3">Est. Time Commit.</h3>
          <h3>{task.estTimeCommitment} hours</h3>
          <h3 className="font-bold pt-3">Total Cost</h3>
          <h3>
            ${" "}
            {(
              (task.taskee.Skills.filter(
                (skill) => skill.subcategoryId === task.subcategoryId
              )[0].price *
                task.estTimeCommitment) /
              100
            ).toFixed(2)}
          </h3>
        </div>
      )}
      <div>
        <h1 className="font-bold pt-3">Starting Address</h1>
        <h2>
          {task.startingStreet}, {task.startingSuite}, {task.startingCity},{" "}
          {task.startingState} {task.startingZip}
        </h2>
        <h1 className="font-bold pt-3">Ending Address</h1>
        <h2>
          {task.endingStreet}, {task.endingSuite}, {task.endingCity},{" "}
          {task.endingState} {task.endingZip}
        </h2>
      </div>
      <div>
        <h2 className="font-bold pt-3">Date & Time</h2>
        <h2>
          {months[formattedDate[1] - 1]} {formattedDate[2]}th,{" "}
          {formattedDate[0]} {formattedTime} {amPm}
        </h2>
      </div>
      <div>
        <h2 className="font-bold pt-3">Vehicle Required?</h2>
        <h2>{vehicleRequired}</h2>
      </div>
      {task.taskeeReview ? (
        <div className="p-2 bg-slate-300 mt-3">
          <h2 className="font-bold">Review</h2>
          <div className="flex pt-2">
            <h2 className="pr-1 text-md">
              {task.taskeeReview.rating.toFixed(1)}
            </h2>
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
          <h2 className="pt-2">{task.taskeeReview.text}</h2>
          <h2 className="pt-2">
            {task.taskeeReview.date.split("T")[0].split("-")[1]}-
            {task.taskeeReview.date.split("T")[0].split("-")[2]}-
            {task.taskeeReview.date.split("T")[0].split("-")[0]}
          </h2>
        </div>
      ) : (
        <button
          onClick={() => setReviewPopupButton(true)}
          className="mt-3 rounded-full text-white bg-cyan-700 font-bold hover:bg-cyan-900 p-3"
        >
          Review
        </button>
      )}

      <ReviewByTaskerPopup
        trigger={reviewPopupButton}
        setTrigger={setReviewPopupButton}
      >
        <form onSubmit={handleSubmitReview} className="flex flex-col">
          <label className="text-center mt-7 font-bold text-lg">Rating</label>
          <div className="flex justify-center mt-8">
            <input
              type="number"
              onChange={(e) => setRating(e.target.value)}
              className="w-10 mr-2"
            />
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

          <label className="text-center mt-8 mb-4 font-bold text-lg">
            Review
          </label>
          <input
            type="text"
            onChange={(e) => setReviewText(e.target.value)}
            className="h-44 mx-5 mb-8"
          />

          <button
            type="submit"
            className="rounded-full text-white bg-cyan-700 font-bold hover:bg-cyan-900 p-2 w-1/3 mx-auto"
          >
            Submit
          </button>
        </form>
      </ReviewByTaskerPopup>
    </div>
  );
}

export default TaskerAccountCompleted;
