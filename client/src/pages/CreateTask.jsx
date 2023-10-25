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
    <div>
      <form onSubmit={(e) => handleCreateTask(e)}>
        {/* STARTING ADDRESS */}
        <h2 className="text-center">Starting Address</h2>
        <div className="flex flex-col mx-5 text-center">
          <input
            className="text-center border-2"
            placeholder="Street"
            type="text"
            onChange={(e) => setStartStreet(e.target.value)}
          />
          <div className="text-center">
            <input
              className="border-2"
              placeholder="City"
              type="text"
              onChange={(e) => setStartCity(e.target.value)}
            />
            <input
              className="border-2"
              placeholder="State"
              type="text"
              onChange={(e) => setStartState(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-2"
              placeholder="Apt / Suite"
              type="text"
              onChange={(e) => setStartSuite(e.target.value)}
            />
            <input
              className="border-2"
              placeholder="Zip Code"
              type="text"
              onChange={(e) => setStartZip(e.target.value)}
            />
          </div>
        </div>
        {/* ENDING ADDRESS */}
        <h2 className="text-center">Ending Address</h2>
        <div className="flex flex-col mx-5 text-center">
          <input
            className="border-2"
            placeholder="Street"
            type="text"
            onChange={(e) => setEndStreet(e.target.value)}
          />
          <div>
            <input
              className="border-2"
              placeholder="City"
              type="text"
              onChange={(e) => setEndCity(e.target.value)}
            />
            <input
              className="border-2"
              placeholder="State"
              type="text"
              onChange={(e) => setEndState(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-2"
              placeholder="Zip Code"
              type="text"
              onChange={(e) => setEndZip(e.target.value)}
            />
            <input
              className="border-2"
              placeholder="Apt / Suite"
              type="text"
              onChange={(e) => setEndSuite(e.target.value)}
            />
          </div>
        </div>
        {/* Vehicle and Time */}
        <h2 className="text-center">Other Information</h2>
        <p>Vehicle Required?</p>
        <input
          type="radio"
          id="yes"
          name="vehicleRequired"
          value={true}
          onChange={() => setVehicleRequired(true)}
        />
        <label htmlFor="yes">Yes</label>
        <input
          type="radio"
          id="no"
          name="vehicleRequired"
          value={false}
          onChange={() => setVehicleRequired(false)}
        />
        <label htmlFor="no">No</label>
        <br />
        <label>Estimated Time Commitment</label>
        <input type="text" onChange={(e) => setEstTimeCommit(e.target.value)} />
        <label>Description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <Link to={"/pick"} state={{ subcat: state.subcat }}>
          <button type="submit">Continue</button>
        </Link>
      </form>
    </div>
  );
}

export default CreateTask;
