import React, { useEffect } from 'react'
import { getTaskeeReviewsThunk } from '../store/taskee'
import { useSelector, useDispatch } from 'react-redux';

export default function TaskeeTasks() {
    const dispatch = useDispatch();
    const taskee = useSelector((state) => state.taskee.task);
    console.log("taskee", taskee);

    useEffect(() => {
        dispatch(getTaskeeReviewsThunk(id));
    }, []);
    
    const completedTasks = taskee.Task.filter(
      (task) => task.isCompleted === true
    );

    const incompleteTasks = taskee.Task.filter(
      (task) => task.isCompleted === false
    );
    console.log("completed tasks", completedTasks);
    console.log("incomplete tasks", incompleteTasks);

    return (
    <div>
      <h1>
        Hi, {taskee.fName} {taskee.lName}
      </h1>
    </div>
  )
}
