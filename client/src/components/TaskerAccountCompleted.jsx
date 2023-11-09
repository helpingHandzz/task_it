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

  return (
    <div key={task.id} className="border shadow-md bg-white m-4">
      <h3>{task.subcategory.subName}</h3>
      {task.taskee && (
        <div>
          <h3>Completed By:</h3>
          <div>
            <img src={task.taskee.photo} />
            <h3>
              {task.taskee.fName} {task.taskee.lName}
            </h3>
          </div>
          <h3>
            $
            {(
              task.taskee.Skills.filter(
                (skill) => skill.subcategoryId === task.subcategoryId
              )[0].price / 100
            ).toFixed(2)}{" "}
            / hr
          </h3>
          <h3>{task.estTimeCommitment} hours</h3>
          <h3>
            Total Cost:{" "}
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
        <h1 className="font-bold">Starting Address</h1>
        <h2>
          {task.startingStreet}, {task.startingSuite}, {task.startingCity},{" "}
          {task.startingState} {task.startingZip}
        </h2>
        <h1 className="font-bold">Ending Address</h1>
        <h2>
          {task.endingStreet}, {task.endingSuite}, {task.endingCity},{" "}
          {task.endingState} {task.endingZip}
        </h2>
      </div>
      <div>
        <h2 className="font-bold">Date & Time</h2>
        <h2>
          {months[formattedDate[1] - 1]} {formattedDate[2]}th,{" "}
          {formattedDate[0]} {formattedTime} {amPm}
        </h2>
      </div>
      <div>
        <h2 className="font-bold">Vehicle Required?</h2>
        <h2>{vehicleRequired}</h2>
      </div>
      {task.taskeeReview ? (
        <div>
          <h2>{task.taskeeReview.rating}</h2>
          <h2>{task.taskeeReview.text}</h2>
        </div>
      ) : (
        <button
          onClick={() => setReviewPopupButton(true)}
          className="rounded-full text-white bg-cyan-700 font-bold hover:bg-cyan-900 p-3"
        >
          Review
        </button>
      )}

      <ReviewByTaskerPopup
        trigger={reviewPopupButton}
        setTrigger={setReviewPopupButton}
      >
        <form onSubmit={handleSubmitReview} className="flex flex-col">
          <label>Rating</label>
          <input type="text" onChange={(e) => setRating(e.target.value)} />
          <label>Review</label>
          <input type="text" onChange={(e) => setReviewText(e.target.value)} />
          <button
            type="submit"
            className="rounded-full text-white bg-cyan-700 font-bold hover:bg-cyan-900 p-3 w-1/2 mx-auto"
          >
            Submit
          </button>
        </form>
      </ReviewByTaskerPopup>
    </div>
  );
}

export default TaskerAccountCompleted;
