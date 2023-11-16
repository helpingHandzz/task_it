import React from "react";
import { useEffect, useState } from "react";
import { getTaskerThunk } from "../store/tasker";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskerAccountCompleted from "../components/TaskerAccountCompleted";
import TaskerAccountIncomplete from "../components/TaskerAccountIncomplete";

function TaskerAccount() {
	const { id } = useParams();
	const dispatch = useDispatch();


  const tasker = useSelector((state) => state.tasker.singleTasker);
  const postedTask = useSelector((state) => state.task.postedTask);
  // console.log("tasker", tasker);


	const [_, updateState] = useState();
	const forceUpdate = React.useCallback(
		() => updateState({}),
		[]
	);

	useEffect(() => {
		dispatch(getTaskerThunk(id));
	}, [postedTask]);


  const completedTasks = tasker.Task?.filter(
    (task) => task.isCompleted === true
  );

  const incompleteTasks = tasker.Task?.filter(
    (task) => task.isCompleted === false
  );
  // console.log("completed tasks", completedTasks);
  // console.log("incomplete tasks", incompleteTasks);


  return (
    <div>
      <h1 className="text-center font-bold text-3xl py-3">
        Hi, {tasker.fName} {tasker.lName}
      </h1>
      <h2 className="font-bold text-center text-lg py-3">Open Tasks</h2>
      <div className="md:flex md:flex-wrap md:mx-auto">
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => (
            <TaskerAccountIncomplete key={task.id} task={task} />
          ))
        ) : (
          <h2 className="text-center">No Open Tasks</h2>
        )}
      </div>
      <h2 className="font-bold text-center text-lg py-3">Completed Tasks</h2>
      <div className="md:flex md:flex-wrap md:mx-auto">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TaskerAccountCompleted
              key={task.id}
              task={task}
              forceUpdate={forceUpdate}
            />
          ))
        ) : (
          <h2 className="text-center">No Completed Tasks</h2>
        )}
      </div>
    </div>
  );

}

export default TaskerAccount;
