import { useEffect } from "react";
import { getTaskerThunk } from "../store/tasker";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function SingleTasker() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasker = useSelector((state) => state.tasker.singleTasker);
  console.log("tasker", tasker);

  useEffect(() => {
    dispatch(getTaskerThunk(id));
  }, []);

  return (
    <div>
      <h2>SINGLE TASKER</h2>
      <h3>{tasker.fName}</h3>
      <h3>{tasker.lName}</h3>
    </div>
  );
}
