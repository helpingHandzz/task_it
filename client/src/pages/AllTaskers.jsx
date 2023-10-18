import React, { useEffect } from "react";
import { getTaskersThunk } from "../store/tasker";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Note: This should be react-router-dom

export default function AllTaskers() {
  const dispatch = useDispatch();
  const taskers = useSelector((state) => state.tasker.allTaskers);
  console.log("taskers", taskers);

  useEffect(() => {
    dispatch(getTaskersThunk());
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      <h1 className="w-full text-center pb-8 font-bold text-4xl">TASKERS</h1>
      {taskers.length > 0 &&
        taskers.map((tasker) => (
          <div
            key={tasker.id}
            className="flex-shrink-0 w-full max-w-[400px] mx-2 mb-8"
            onClick={() => handleTaskerClick(tasker.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="border-2 p-4">
              <img
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=1800&t=st=1697656747~exp=1697657347~hmac=330d8af8546b2c9817d340c9ca0ce83859d94fd2776efdadbf9ffced23fbe030"
                alt="man smiling"
                className="w-full h-auto mb-4"
              />
              <h2 className="text-xl font-bold mb-2">First Name: {tasker.fName}</h2>
              <h2 className="text-xl font-bold mb-2">Last Name: {tasker.lName}</h2>
              <h2 className="text-xl font-bold mb-2">Email: {tasker.email}</h2>
            </div>
          </div>
        ))}
    </div>
  );
}
