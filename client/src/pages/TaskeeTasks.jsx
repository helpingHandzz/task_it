import React, { useEffect } from 'react';
import { getTaskeeThunk } from '../store/taskee';
import { useSelector, useDispatch } from 'react-redux';

export default function TaskeeTasks() {
  const dispatch = useDispatch();
  const taskeeId = useSelector((state) => state.auth.user.taskeeId);
  const taskee = useSelector((state) => state.taskee.singleTaskee);

  useEffect(() => {
    if (taskeeId) dispatch(getTaskeeThunk(taskeeId));
  }, [dispatch, taskeeId]);

  const completedTasks = taskee?.Task?.filter(task => task.isCompleted === true);
  const incompleteTasks = taskee?.Task?.filter(task => task.isCompleted === false);

  console.log("Taskee Data:", taskee);
  console.log("completed tasks", completedTasks);
  console.log("incomplete tasks", incompleteTasks);

  return (
    <div>
      {taskee && (
        <>
          <h1>Hi, {taskee.fName} {taskee.lName}</h1>

          <h2>Tasks In Progress</h2>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <div key={task.id}>
                Task: {task.description}<br />
                Category: {task.subcategory.subName}<br />
                Tasker: {task.tasker?.fName} {task.tasker?.lName.charAt(0)}.
              </div>
            ))
          ) : (
            <p>No tasks in progress.</p>
          )}

          <h2>Completed Tasks</h2>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task.id}>
                Task: {task.description}<br />
                Category: {task.subcategory.subName}<br />
                Tasker: {task.tasker?.fName} {task.tasker?.lName.charAt(0)}.
              </div>
            ))
          ) : (
            <p>No completed tasks.</p>
          )}
        </>
      )}
    </div>
  );
}