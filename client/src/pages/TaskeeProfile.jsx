import React from "react";
import TaskeeTools from "../components/TaskeeTools";
import TaskeeVehicles from "../components/TaskeeVehicles";
import TaskeeOtherFacts from "../components/TaskeeOtherFacts";
import TaskeeAboutMe from "../components/TaskeeAboutMe";
import { useNavigate } from "react-router";

export default function TaskeeProfile() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/account");
  };

  return (
    <>
      <div className="profileContainer border-4 rounded-lg m-4 p-4 flex flex-col items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-3/4 lg:w-1/2">
          <TaskeeTools />
          <TaskeeVehicles />
          <TaskeeOtherFacts />
          <TaskeeAboutMe />
        </div>
      </div>
      <button onClick={handleBack} className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded m-4">BACK</button>
    </>
  );
}
