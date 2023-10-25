import { getTaskeesThunk } from "../store/taskee";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import StarRatings from "react-star-ratings";

function PickATaskee() {
  let { state } = useLocation();
  const dispatch = useDispatch();
  const taskees = useSelector((state) => state.taskee.allTaskees);

  useEffect(() => {
    dispatch(getTaskeesThunk());
  }, []);

  const filteredBySubcat = taskees.map((taskee) => ({
    ...taskee,
    Skills: taskee.Skills.filter(
      (skill) => skill.subcategoryId === state.subcat.id
    ),
  }));

  const filteredBySkill = filteredBySubcat.filter(
    (taskee) => taskee.Skills.length > 0
  );

  console.log("test", filteredBySkill);
  return (
    <div className="flex-col lg:flex lg:flex-row min-w-screen lg:mx-5 xl:mx-10 2xl:mx-16">
      <div className="lg:bg-slate-400 lg:w-1/3 lg:mr-3 xl:mr-5 lg:mt-5 lg:h-80">
        <div className=""></div>
      </div>
      <div className="lg:w-full lg:mr-7">
        {filteredBySkill.map((taskee) => (
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
              <button className="rounded-full bg-orange-400 mt-5 ml-8 p-2">
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
              <div className="my-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickATaskee;
