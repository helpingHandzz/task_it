import { useSelector } from "react-redux";

function BookingPage() {
  const currentTask = useSelector((state) => state.task.postedTask);
  console.log("currentTask", currentTask);

  const filtered = currentTask.taskee.Skills.filter(
    (skill) => skill.subcategoryId === currentTask.subcategoryId
  );
  console.log("filtered", filtered);

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
  const formattedDate = currentTask.date.split("-");

  const amPm =
    Number(currentTask.startTime.slice(0, 2)) <= 12 ? "A.M." : "P.M.";

  const formattedTime =
    Number(currentTask.startTime.slice(0, 2)) <= 12
      ? currentTask.startTime
      : Number(currentTask.startTime.slice(0, 2)) -
        12 +
        ":" +
        currentTask.startTime.slice(3, 5);

  const vehicleRequired = currentTask.vehicleRequired ? "Yes" : "No";
  return (
    <div>
      <div className="border rounded bg-white shadow-md m-5">
        <h1 className="text-2xl font-bold">Task</h1>
        <h2>{currentTask.subcategory.subName}</h2>
        <h1 className="text-2xl font-bold">Starting Address</h1>
        <h2>
          {currentTask.startingStreet}, {currentTask.startingSuite},{" "}
          {currentTask.startingCity}, {currentTask.startingState}{" "}
          {currentTask.startingZip}
        </h2>
        <h1 className="text-2xl font-bold">Ending Address</h1>
        <h2>
          {currentTask.endingStreet}, {currentTask.endingSuite},{" "}
          {currentTask.endingCity}, {currentTask.endingState}{" "}
          {currentTask.endingZip}
        </h2>
        <h1 className="text-2xl font-bold">Date & Time</h1>
        <h2>
          {months[formattedDate[1] - 1]} {formattedDate[2]}, {formattedDate[0]}{" "}
          {formattedTime} {amPm}
        </h2>
        <h1 className="text-2xl font-bold">Vehicle Required?</h1>
        <h2>{vehicleRequired}</h2>
        <h1 className="text-2xl font-bold">Description</h1>
        <h2>{currentTask.description}</h2>
      </div>
      <div className="border rounded bg-white shadow-md m-5">
        <div>
          <img src={currentTask.taskee.photo} className="rounded-full" />
          <h2>
            {currentTask.taskee.fName} {currentTask.taskee.lName}
          </h2>
        </div>
        <div className="flex justify-between">
          <h1>Price per Hour</h1>
          <h2>${(filtered[0].price / 100).toFixed(2)}</h2>
        </div>
        <div className="flex justify-between">
          <h1>Est. Time Commitment</h1>
          <h2>{currentTask.estTimeCommitment} Hours</h2>
        </div>
        <div className="flex justify-between">
          <h1>Total Cost</h1>
          <h2>
            $
            {(
              (currentTask.estTimeCommitment * filtered[0].price) /
              100
            ).toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
