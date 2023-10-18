import React, { useEffect } from 'react'
import { getTaskersThunk } from './store/tasker'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function AllTaskers() {
    const dispatch = useDispatch();
    const taskers = useSelector((state) => state.taskers.allTaskers);
    console.log("taskers", taskers);

    useEffect(() => {
        dispatch(getTaskersThunk());
    }, []);

  return (
    <div>
        <h1>TASKERS</h1>
        {taskers.length > 0 &&
            taskers.map((tasker) => (
                <div>
                    <h2>Tasker First Name: {tasker.fName}</h2>
                    <h2>Tasker Last Name: {tasker.lName}</h2>
                    <h2>Tasker Email: {tasker.email}</h2>
                </div>
            ))
        }
    </div>
  )
}
