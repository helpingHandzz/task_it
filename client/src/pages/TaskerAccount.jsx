import { useEffect } from "react";
import { getTaskerThunk } from "../store/tasker";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskerAccountCompleted from "../components/TaskerAccountCompleted";

function TaskerAccount() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasker = useSelector((state) => state.tasker.singleTasker);
  console.log("tasker", tasker);
  useEffect(() => {
    dispatch(getTaskerThunk(id));
  }, []);

  const completedTasks = tasker.Task.filter(
    (task) => task.isCompleted === true
  );

  const incompleteTasks = tasker.Task.filter(
    (task) => task.isCompleted === false
  );
  console.log("completed tasks", completedTasks);
  console.log("incomplete tasks", incompleteTasks);

  return (
    <div>
      <h1>
        Hi, {tasker.fName} {tasker.lName}
      </h1>
      <h2 className="font-bold">Open Tasks</h2>
      {}
      <h2 className="font-bold">Completed Tasks</h2>
      {completedTasks.map((task) => (
        <TaskerAccountCompleted key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskerAccount;
