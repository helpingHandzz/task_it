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
          <h1 className='text-3xl font-bold text-center p-4'>Hi, {taskee.fName} {taskee.lName}</h1>

          <h2 className='border-4 m-4 rounded-lg bg-green-400 border-green-400 text-center text-2xl font-bold'>Tasks In Progress</h2>
          {incompleteTasks?.length > 0 ? (
            incompleteTasks.map((task) => (
              <div key={task.id} className='border-4 m-4 rounded-lg p-4'>
                <p className="mb-2">Task: {task.description}</p>
                <p className="mb-2">Category: {task.subcategory.subName}</p>
                <p className="mb-2">Tasker: {task.tasker?.fName} {task.tasker?.lName.charAt(0)}</p>
              </div>
            ))
          ) : (
            <p className='border-4 m-4 rounded-lg bg-green-400 border-green-400 text-cente text-2xlr font-bold'>No tasks in progress.</p>
          )}

          <h2 className='border-4 m-4 rounded-lg bg-sky-400 border-sky-400 text-center text-2xl font-bold'>Completed Tasks</h2>
          {completedTasks?.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task.id} className='border-4 m-4 rounded-lg p-4'>
               <p className="mb-2">Task: {task.description}</p>
                <p className="mb-2">Category: {task.subcategory.subName}</p>
                <p className="mb-2">Tasker: {task.tasker?.fName} {task.tasker?.lName.charAt(0)}</p>
              </div>
            ))
          ) : (
            <p className='border-4 m-4 rounded-lg bg-sky-400 border-sky-400 text-center text-2xl font-bold'>No completed tasks.</p>
          )}
        </>
      )}
    </div>
  );
}