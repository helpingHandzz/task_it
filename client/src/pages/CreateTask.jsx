import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { postTaskThunk } from "../store/task";

function CreateTask({ sub }) {
  let { state } = useLocation();
  console.log("subcat", state.subcat);
  const dispatch = useDispatch();
  //STARTING
  const [startStreet, setStartStreet] = useState("");
  const [startCity, setStartCity] = useState("");
  const [startState, setStartState] = useState("");
  const [startZip, setStartZip] = useState("");
  const [startSuite, setStartSuite] = useState("");
  //ENDING
  const [endStreet, setEndStreet] = useState("");
  const [endCity, setEndCity] = useState("");
  const [endState, setEndState] = useState("");
  const [endZip, setEndZip] = useState("");
  const [endSuite, setEndSuite] = useState("");

  //OTHER INFORMATION
  const [vehicleRequired, setVehicleRequired] = useState(false);
  const [estTimeCommit, setEstTimeCommit] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = (e) => {
    e.preventDefault();
    dispatch(
      postTaskThunk({
        subcategoryId: state.subcat.id,
        description: description,
        isCompleted: false,
        vehicleRequired: vehicleRequired,
        isAssigned: false,
        estTimeCommitment: +estTimeCommit,
        startingStreet: startStreet,
        startingCity: startCity,
        startingState: startState,
        startingZip: startZip,
        startingSuite: startSuite,
        endingStreet: endStreet,
        endingCity: endCity,
        endingState: endState,
        endingZip: endZip,
        endingSuite: endSuite,
      })
    );
  };

  return (
    <div className="bg-slate-100 pt-7">
      <h1 className="text-3xl font-bold pl-4 pb-8 xl:pl-0  xl:w-4/5 mx-auto">
        {state.subcat.subName}
      </h1>
      <form onSubmit={(e) => handleCreateTask(e)}>
        {/* STARTING ADDRESS */}
        <div className="border  mx-4 pb-8 rounded bg-white shadow xl:w-4/5 xl:mx-auto">
          <h2 className="text-center my-8 text-3xl">Starting Address</h2>
          <div className="flex flex-col mx-5 text-center">
            <input
              className="text-center border border-black rounded h-9 mx-3 lg:w-[44%] lg:text-left lg:pl-3"
              placeholder="Street Address"
              type="text"
              onChange={(e) => setStartStreet(e.target.value)}
            />
            <div className="flex justify-between mx-3 mt-5">
              <input
                className="border border-black rounded h-9 w-[45%] pl-2 "
                placeholder="City"
                type="text"
                onChange={(e) => setStartCity(e.target.value)}
              />
              <input
                className="border border-black rounded h-9 pl-2 w-[45%] "
                placeholder="State"
                type="text"
                onChange={(e) => setStartState(e.target.value)}
              />
            </div>
            <div className="flex justify-between mx-3 mt-5">
              <input
                className="border border-black rounded h-9 pl-2 w-[45%]"
                placeholder="Apt / Suite"
                type="text"
                onChange={(e) => setStartSuite(e.target.value)}
              />
              <input
                className="border border-black rounded h-9 pl-2 w-[45%] "
                placeholder="Zip Code"
                type="text"
                onChange={(e) => setStartZip(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* ENDING ADDRESS */}
        <div className="border mt-4 mx-4 pb-8 rounded bg-white shadow xl:w-4/5 xl:mx-auto">
          <h2 className="text-center my-8 text-3xl">Ending Address</h2>
          <div className="flex flex-col mx-5 text-center">
            <input
              className="text-center border border-black rounded h-9 mx-3 lg:w-[44%] lg:text-left lg:pl-3"
              placeholder="Street Address"
              type="text"
              onChange={(e) => setEndStreet(e.target.value)}
            />
            <div className="flex justify-between mx-3 mt-5">
              <input
                className="border border-black rounded h-9 pl-2 w-[45%]"
                placeholder="City"
                type="text"
                onChange={(e) => setEndCity(e.target.value)}
              />
              <input
                className="border border-black rounded h-9 pl-2 w-[45%]"
                placeholder="State"
                type="text"
                onChange={(e) => setEndState(e.target.value)}
              />
            </div>
            <div className="flex justify-between mx-3 mt-5">
              <input
                className="border border-black rounded h-9 pl-2 w-[45%]"
                placeholder="Zip Code"
                type="text"
                onChange={(e) => setEndZip(e.target.value)}
              />
              <input
                className="border border-black rounded h-9 pl-2 w-[45%]"
                placeholder="Apt / Suite"
                type="text"
                onChange={(e) => setEndSuite(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Vehicle and Time */}
        <div className="border mt-4 mx-4 pb-8 rounded bg-white shadow xl:w-4/5 xl:mx-auto">
          <h2 className="text-center my-8 text-3xl">Other Information</h2>
          <div className="flex justify-between mx-8">
            <div className="w-[45%]">
              <p className="flex justify-center">Vehicle Required?</p>
              <div className="flex justify-center pt-2 lg:content-center">
                <input
                  type="radio"
                  id="yes"
                  name="vehicleRequired"
                  value={true}
                  onChange={() => setVehicleRequired(true)}
                />
                <label htmlFor="yes" className="pl-2">
                  Yes
                </label>
                <input
                  className="ml-3"
                  type="radio"
                  id="no"
                  name="vehicleRequired"
                  value={false}
                  onChange={() => setVehicleRequired(false)}
                />
                <label htmlFor="no" className="pl-2">
                  No
                </label>
              </div>
            </div>
            <br />
            <input
              className="border border-black rounded h-9 pl-2 w-[45%]"
              placeholder="Est. Time Commitment"
              type="text"
              onChange={(e) => setEstTimeCommit(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center mt-8 lg:items-end lg:mx-8">
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="border border-black h-24 w-80 rounded pl-2 lg:w-[45%]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Link to={"/pick"} state={{ subcat: state.subcat }}>
            <button
              type="submit"
              className="my-8 bg-cyan-700 text-white font-bold hover:bg-cyan-900 rounded-full px-5 py-2"
            >
              Continue
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
