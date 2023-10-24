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
        taskerId: 1,
        subcategoryId: state.subcat.id,
        description: description,
        isCompleted: false,
        vehicleRequired: vehicleRequired,
        isAssigned: false,
        estTimeCommitment: estTimeCommit,
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
        <h2>Starting Address</h2>
        <label>Street</label>
        <input type="text" onChange={(e) => setStartStreet(e.target.value)} />
        <label>City</label>
        <input type="text" onChange={(e) => setStartCity(e.target.value)} />
        <label>State</label>
        <input type="text" onChange={(e) => setStartState(e.target.value)} />
        <label>Zip Code</label>
        <input type="text" onChange={(e) => setStartZip(e.target.value)} />
        <label>Apt / Suite</label>
        <input type="text" onChange={(e) => setStartSuite(e.target.value)} />
        {/* ENDING ADDRESS */}
        <h2>Ending Address</h2>
        <label>Street</label>
        <input type="text" onChange={(e) => setEndStreet(e.target.value)} />
        <label>City</label>
        <input type="text" onChange={(e) => setEndCity(e.target.value)} />
        <label>State</label>
        <input type="text" onChange={(e) => setEndState(e.target.value)} />
        <label>Zip Code</label>
        <input type="text" onChange={(e) => setEndZip(e.target.value)} />
        <label>Apt / Suite</label>
        <input type="text" onChange={(e) => setEndSuite(e.target.value)} />
        {/* Vehicle and Time */}
        <h2>Other Information</h2>
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
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default CreateTask;
