import React, { useState } from 'react'

export default function OtherFacts() {
  const [showFactsDropdown, setShowFactsDropdown] = useState(false);
  const [selectedFacts, setSelectedFacts] = useState([]);
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [language, setLanguage] = useState('');

  const factsList = [
    "I have pet allergies",
    "I speak multiple languages",
    "I require a 2 hour minimum",
    "None of the above apply to me",
  ];

  const handleFactsSelection = (facts) => {
    setSelectedFacts((prevSelectedFacts) => {
      if (prevSelectedFacts.includes(facts)) {
        return prevSelectedFacts.filter((i) => i !== facts);
      } else {
        return [...prevSelectedFacts, facts];
      }
    });
    if (facts === "I speak multiple languages") {
      setShowLanguageInput(!showLanguageInput);
    }
  };

  const handleSaveFacts = () => {
    console.log("Selected Facts:", selectedFacts);
    if (showLanguageInput && language) {
      console.log("Languages Spoken:", language);
    }
    setShowFactsDropdown(false);
    setShowLanguageInput(false);
  };

  return (
    <>
      <button
        onClick={() => setShowFactsDropdown(!showFactsDropdown)}
        className="factsContainer border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-teal-200 cursor-pointer"
      >
        <h1>Tools</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      </button>

      {showFactsDropdown && (
          <div className="dropdown-menu bg-F2F5F9 rounded p-4 flex flex-col">
            {factsList.map((fact, index) => {
  return (
    <>
      <div key={fact}
        className={`flex items-center border-4 justify-between p-2 my-1 rounded-lg cursor-pointer ${
          selectedFacts.includes(fact)
            ? "border-green-500 bg-green-500 text-white"
            : "border-gray-200 bg-gray-100"
        }`}
        onClick={() => handleFactsSelection(fact)}
      >
        {fact}
        {selectedFacts.includes(fact) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
        )}
      </div>
      {fact === "I speak multiple languages" && selectedFacts.includes(fact) && (
        <input 
          type="text"
          placeholder="Enter Languages Spoken"
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded mt-2"
        />
      )}
    </>
  );
})}
            <button
              onClick={handleSaveFacts}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        )}
    </>
  );
}
