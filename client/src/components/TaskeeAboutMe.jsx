import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { postTaskeeAboutThunk } from '../store/taskee';

export default function AboutMe() {
  const dispatch = useDispatch();
  const taskeeId = useSelector((state => state.auth.user.taskeeId));
  
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [aboutInfo, setAboutInfo] = useState('');

  const handleInputChange = (e) => {
    setAboutInfo(e.target.value);
  };

  const handleSaveAbout = () => {
    console.log("About Me:", aboutInfo);
    if (aboutInfo) {
      dispatch(postTaskeeAboutThunk(taskeeId, aboutInfo));
    }
    setShowAboutDropdown(false);
  };

  return (
    <>
      <button
        onClick={() => setShowAboutDropdown(!showAboutDropdown)}
        className="toolsContainer border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer"
      >
        <div className="flex items-center">
          <h1 className="mr-4">About Me</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-person-fill ml-4"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        </div>
      </button>

      {showAboutDropdown && (
        <div className="dropdown-menu bg-F2F5F9 rounded p-4 flex flex-col">
          <h1 className="text-3xl font-bold">About</h1>
          <p>Tell us about yourself.</p>
          <input
            type="text"
            placeholder="Type here..."
            value={aboutInfo}
            onChange={handleInputChange}
            className="border-2 border-gray-300 p-2 rounded-lg"
          />
          <button
            onClick={handleSaveAbout}
            className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded font-bold"
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}
