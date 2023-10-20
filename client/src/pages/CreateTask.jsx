import React from "react";

function CreateTask() {
  return (
    <div>
      <form>
        {/* STARTING ADDRESS */}
        <h2>Starting Address</h2>
        <label>Street</label>
        <input type="text" />
        <label>City</label>
        <input type="text" />
        <label>State</label>
        <input type="text" />
        <label>Zip Code</label>
        <input type="text" />
        <label>Apt / Suite</label>
        <input type="text" />
        {/* ENDING ADDRESS */}
        <h2>Ending Address</h2>
        <label>Street</label>
        <input type="text" />
        <label>City</label>
        <input type="text" />
        <label>State</label>
        <input type="text" />
        <label>Zip Code</label>
        <input type="text" />
        <label>Apt / Suite</label>
        <input type="text" />
      </form>
    </div>
  );
}

export default CreateTask;
