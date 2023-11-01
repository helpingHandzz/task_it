import { useSelector } from "react-redux";

function BookingPage() {
  const currentTask = useSelector((state) => state.task.postedTask);
  console.log("currentTask", currentTask);
  return (
    <div>
      <h1>Starting Address</h1>
      <h2>
        {currentTask.startingStreet}, {currentTask.startingSuite},{" "}
        {currentTask.startingCity}, {currentTask.startingState}{" "}
        {currentTask.startingZip}
      </h2>
      <h1>Ending Address</h1>
      <h2>
        {currentTask.endingStreet}, {currentTask.endingSuite},{" "}
        {currentTask.endingCity}, {currentTask.endingState}{" "}
        {currentTask.endingZip}
      </h2>
    </div>
  );
}

export default BookingPage;
