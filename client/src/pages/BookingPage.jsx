import { useSelector } from "react-redux";
import PayButton from "../components/PayButton";

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
  const formattedDate = currentTask.date?.split("-");

  if (!formattedDate) {
    return <div>LOADING...</div>;
  }

  const amPm =
    Number(currentTask.startTime?.slice(0, 2)) <= 12 ? "A.M." : "P.M.";

  const formattedTime =
    Number(currentTask.startTime?.slice(0, 2)) <= 12
      ? currentTask.startTime
      : Number(currentTask.startTime?.slice(0, 2)) -
        12 +
        ":" +
        currentTask.startTime?.slice(3, 5);

  const vehicleRequired = currentTask.vehicleRequired ? "Yes" : "No";
  return (
    <div className="lg:flex lg:justify-around lg:mx-10">
      <div className="border rounded bg-white shadow-md m-5 p-4 lg:w-2/5">
        {/* <h1 className="text-2xl font-bold">Task</h1> */}
        <h2 className="text-2xl font-bold">
          {currentTask.subcategory.subName}
        </h2>
        <h1 className="text-lg font-bold mt-2">Starting Address</h1>
        <h2>
          {currentTask.startingStreet}, {currentTask.startingSuite},{" "}
          {currentTask.startingCity}, {currentTask.startingState}{" "}
          {currentTask.startingZip}
        </h2>
        <h1 className="text-lg font-bold mt-2">Ending Address</h1>
        <h2>
          {currentTask.endingStreet}, {currentTask.endingSuite},{" "}
          {currentTask.endingCity}, {currentTask.endingState}{" "}
          {currentTask.endingZip}
        </h2>
        <h1 className="text-lg font-bold mt-2">Date & Time</h1>
        <h2>
          {months[formattedDate[1] - 1]} {formattedDate[2]}th,{" "}
          {formattedDate[0]} {formattedTime} {amPm}
        </h2>
        <h1 className="text-lg font-bold mt-2">Vehicle Required?</h1>
        <h2>{vehicleRequired}</h2>
        <h1 className="text-lg font-bold mt-2">Description</h1>
        <h2>{currentTask.description}</h2>
      </div>
      <div className="border rounded bg-white shadow-md m-5 flex justify-between lg:w-2/5 lg:flex-col lg:p-4">
        <div className="ml-4 mt-4 lg:flex lg:justify-between lg:p-4">
          <img src={currentTask.taskee.photo} className="rounded-full" />
          <h2 className="text-2xl font-bold mt-3">
            {currentTask.taskee.fName} {currentTask.taskee.lName}
          </h2>
        </div>
        <div className="flex flex-col pt-3 mr-4 lg:p-4">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">Price per Hour</h1>
            <h2>${(filtered[0].price / 100).toFixed(2)}</h2>
          </div>
          <div className="flex justify-between border-b border-black my-2">
            <h1 className="text-lg font-bold mr-4">Est. Time Commitment</h1>
            <h2>{currentTask.estTimeCommitment} Hours</h2>
          </div>
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">Total Cost</h1>
            <h2>
              $
              {(
                (currentTask.estTimeCommitment * filtered[0].price) /
                100
              ).toFixed(2)}
            </h2>
          </div>
          <div className="mt-10 flex justify-center mb-3">
            <PayButton currentTask={currentTask} filteredSkill={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
