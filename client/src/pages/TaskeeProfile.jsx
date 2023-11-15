import React from "react";
import TaskeeTools from "../components/TaskeeTools";
import TaskeeVehicles from "../components/TaskeeVehicles";
import TaskeeOtherFacts from "../components/TaskeeOtherFacts";
import TaskeeAboutMe from "../components/TaskeeAboutMe";

export default function TaskeeProfile() {
  
    return (
    <>
      <div className="profileContainer border-4 rounded-lg m-4 p-4 flex flex-col items-center justify-between">
        <div className="grid grid-cols-1 gap-4 w-1/2">
          <TaskeeTools />
          <TaskeeVehicles />
          <TaskeeOtherFacts />
          <TaskeeAboutMe />
        </div>
      </div>
    </>
  );
}

