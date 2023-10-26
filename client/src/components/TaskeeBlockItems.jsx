import { useState } from "react";
import StarRatings from "react-star-ratings";
import ProfilePopup from "./ProfilePopup";

function TaskeeBlockItems({ taskee, buttonPopup, setButtonPopup }) {
  console.log("popup", buttonPopup);
  return (
    <div
      key={taskee.id}
      className="border-2 rounded flex my-5 mx-5 h-80 lg:w-full lg:mr-5 md:bg-red-400 sm:bg-blue-400 lg:bg-yellow-300 xl:bg-purple-500 2xl:bg-green-500"
    >
      <div className="text-center w-40 lg:w-56">
        <img
          src={taskee.photo}
          alt={taskee.lName}
          className="rounded-full h-30 w-36 mt-3 ml-5 lg:w-48 lg:h-48"
        />
        <button
          onClick={() => setButtonPopup(true)}
          className="rounded-full bg-orange-400 mt-5 ml-8 p-2"
        >
          View Profile
        </button>
      </div>
      <div className="flex-col ml-10 w-3/4">
        <div className="flex justify-between pr-5 mt-3 w-full">
          <h3 className="text-xl lg:text-2xl">
            {taskee.fName} {taskee.lName}
          </h3>
          <h3 className="text-xl lg:text-2xl">
            ${taskee.Skills.map((skill) => skill.price) / 100} / hr
          </h3>
        </div>
        <div className={`my-4 ${buttonPopup === true ? "hidden" : ""}`}>
          <StarRatings
            rating={
              taskee.TaskeeReview.reduce(
                (acc, curr) => (acc += curr.rating),
                0
              ) / taskee.TaskeeReview.length
            }
            starRatedColor="gold"
            numberOfStars={5}
            starDimension="25px"
            starSpacing="1px"
          />
        </div>
        <div className="bg-slate-200 mr-3 rounded h-32">
          <h3 className="mt-10 text-xl p-2">Experience:</h3>
          <p className="p-2">
            {taskee.Skills.map((skill) => skill.experience)}
          </p>
        </div>
        <div className="text-center">
          <button className="rounded-full bg-green-400 py-2 px-5 mt-3">
            Select Taskee
          </button>
        </div>
      </div>
      <ProfilePopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="flex">
          <img
            src={taskee.photo}
            alt={taskee.lName}
            className="rounded-full pt-5 pl-5 h-44 w-44"
          />
          <div className="ml-10">
            <h3 className="text-2xl font-bold pt-5">
              {taskee.fName} {taskee.lName}
            </h3>
            <h3 className="text-2xl lg:text-2xl pt-7">
              ${taskee.Skills.map((skill) => skill.price) / 100} / hr
            </h3>
            <div className="pt-7">
              <StarRatings
                rating={
                  taskee.TaskeeReview.reduce(
                    (acc, curr) => (acc += curr.rating),
                    0
                  ) / taskee.TaskeeReview.length
                }
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="25px"
                starSpacing="1px"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-200 mx-3 rounded h-32">
          <h3 className="mt-10 text-xl p-2">Experience:</h3>
          <p className="p-2">
            {taskee.Skills.map((skill) => skill.experience)}
          </p>
        </div>
        <div className="bg-slate-200 mx-3 rounded h-min mb-8">
          <h3 className="mt-10 text-xl p-2">Reviews:</h3>
          {taskee.TaskeeReview.map((review) => (
            <div key={review.id} className="pl-5 pb-7">
              <h3 className="text-xl font-bold">
                {review.tasker.fName} {review.tasker.lName}
              </h3>
              <div className="pt-2">
                <StarRatings
                  rating={review.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="1px"
                />
              </div>
              <h3 className="pt-2">{review.date.split("T")[0]}</h3>
              <p className="pt-2">{review.text}</p>
            </div>
          ))}
        </div>
      </ProfilePopup>
    </div>
  );
}

export default TaskeeBlockItems;
