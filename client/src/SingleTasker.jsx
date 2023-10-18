import React, { useEffect } from "react";
import { getTaskerThunk } from "./store/users";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function SingleTasker() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasker = useSelector((state) => state.taskers.singleTasker)
  console.log("tasker", tasker)

  useEffect(() => {
    dispatch(getTaskerThunk(id))
  }, [])
  
    return (
    <div>
      <h2>SINGLE TASKER</h2>
    </div>
  )
}
