import React, { useState } from 'react'

export default function TaskeeTools() {
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [selectedTools, setSelectedTools] = useState([]);

  const toolList = [
    "Dolly",
    "Lawn Mower",
    "Vacuum",
    "Carpet Cleaner",
    "Eco-Friendly Cleaning Supplies",
    "Power Drill",
    "Ladder",
    "Power Saw",
    "Power Washer",
    "I don't have any special tools",
  ];

  const handleToolSelection = (tool) => {
    setSelectedTools((prevSelectedTools) => {
      if (prevSelectedTools.includes(tool)) {
        return prevSelectedTools.filter((i) => i !== tool);
      } else {
        return [...prevSelectedTools, tool];
      }
    });
  };

  const handleSaveTools = () => {
    console.log("Selected Tools:", selectedTools);
    setShowToolsDropdown(false);
  };

  return (
    <>
        <button
          onClick={() => setShowToolsDropdown(!showToolsDropdown)}
          className="toolsContainer border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-teal-200 cursor-pointer"
        >
          <h1>Tools</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-tools"
            viewBox="0 0 16 16"
          >
            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
          </svg>
        </button>

        {showToolsDropdown && (
          <div className="dropdown-menu bg-F2F5F9 rounded p-4 flex flex-col">
            {toolList.map((tool) => (
              <div
                key={tool}
                className={`flex items-center border-4 justify-between p-2 my-1 rounded-lg cursor-pointer ${
                  selectedTools.includes(tool)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-200 bg-gray-100"
                }`}
                onClick={() => handleToolSelection(tool)}
              >
                {tool}
                {selectedTools.includes(tool) && (
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
              onClick={handleSaveTools}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        )}
      </>
  );
}
