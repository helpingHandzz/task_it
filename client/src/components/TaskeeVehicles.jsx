import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { postTaskeeVehiclesThunk } from '../store/taskee';

export default function TaskeeVehicles() {
  const dispatch = useDispatch();
  const taskeeId = useSelector((state => state.auth.user.taskeeId));
  
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
  
    const vehicleList = [
        "Bicycle/Scooter/Motorcycle",
        "Car",
        "Pickup Truck",
        "Minivan/SUV",
        "Full-size van",
        "Moving Truck",
        "I don't have a set of wheels",
    ];
   
    const handleVehicleSelection = (vehicle) => {
        setSelectedVehicles((prevSelectedVehicles) => {
          if (prevSelectedVehicles.includes(vehicle)) {
            return prevSelectedVehicles.filter((i) => i !== vehicle);
          } else {
            return [...prevSelectedVehicles, vehicle];
          }
        });
      };
    
      const handleSaveVehicles = () => {
        console.log("Selected Tools:", selectedVehicles);
        
        dispatch(postTaskeeVehiclesThunk(taskeeId, selectedVehicles.join(', ')));
        setShowVehiclesDropdown(false);
      };
      
    return (
      <>
        <button
          onClick={() => setShowVehiclesDropdown(!showVehiclesDropdown)}
          className="toolsContainer border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer"
        >
          <div className="flex items-center">
            <h1 className="mr-4">Vehicles</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-truck ml-4"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </div>
        </button>

        {showVehiclesDropdown && (
          <div className="dropdown-menu bg-F2F5F9 rounded p-4 flex flex-col">
            {vehicleList.map((vehicle) => (
              <div
                key={vehicle}
                className={`flex items-center border-4 justify-between p-2 my-1 rounded-lg cursor-pointer ${
                  selectedVehicles.includes(vehicle)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-200 bg-gray-100"
                }`}
                onClick={() => handleVehicleSelection(vehicle)}
              >
                {vehicle}
                {selectedVehicles.includes(vehicle) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                )}
              </div>
            ))}
            <button
              onClick={handleSaveVehicles}
              className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded font-bold"
            >
              Save
            </button>
          </div>
        )}
      </>
    );
}
