import { getTaskeesThunk } from "../store/taskee";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TaskeeBlockItems from "../components/TaskeeBlockItems";

function PickATaskee() {
  let { state } = useLocation();
  const dispatch = useDispatch();
  const [buttonPopup, setButtonPopup] = useState(false);
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
          <TaskeeBlockItems
            key={taskee.id}
            taskee={taskee}
            buttonPopup={buttonPopup}
            setButtonPopup={setButtonPopup}
          />
        ))}
      </div>
    </div>
  );
}

export default PickATaskee;
