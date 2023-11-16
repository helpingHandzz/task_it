import { getTaskeesThunk } from "../store/taskee";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import TaskeeBlockItems from "../components/TaskeeBlockItems";

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

  return (
    <div className="flex-col lg:flex lg:flex-row min-w-screen lg:mx-5 xl:mx-20 2xl:mx-44 bg-slate-100">
      <div className="bg-white lg:w-1/3 mx-5 xl:mr-5 lg:mt-5 lg:h-min lg:rounded lg:shadow-md p-4">
        <h2 className="font-semibold text-2xl">
          Pick the Taskee that's right for your job!{" "}
        </h2>
        <h2 className=" text-lg pt-10">
          Each Taskee has their own unique experience and can set their own
          prices, pick the Taskee that best supports your needs at the price you
          want!
        </h2>
        <h2 className=" text-lg pt-10">
          Once you have picked your Taskee, schedule them for a date and time
          that fits your schedule. Get the job done on your time!
        </h2>
      </div>
      <div className="lg:w-full lg:mr-7">
        {filteredBySkill.map((taskee) => (
          <TaskeeBlockItems key={taskee.id} taskee={taskee} />
        ))}
      </div>
    </div>
  );
}

export default PickATaskee;
