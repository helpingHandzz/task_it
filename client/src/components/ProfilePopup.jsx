import React, { Children } from "react";

function ProfilePopup({ trigger, setTrigger, children }) {
  return trigger ? (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="relative w-full h-full rounded-lg bg-white md:h-3/5 md:mx-[20%] md:my-auto overflow-auto">
        <button
          onClick={() => setTrigger(false)}
          className="absolute top-0 right-0 pt-5 pr-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default ProfilePopup;
