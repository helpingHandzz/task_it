import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk } from "../store/task";

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.allTasks);
  console.log("data", tasks);

  useEffect(() => {
    dispatch(getTasksThunk());
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <div key={task.id}>
            <h1>{task.description}</h1>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
