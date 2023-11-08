import React from "react";

function TaskerAccountIncomplete({ task }) {
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
    </div>
  );
}

export default TaskerAccountIncomplete;
