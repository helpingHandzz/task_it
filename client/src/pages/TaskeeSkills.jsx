import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { getTaskeeSkillsThunk } from '../store/taskee';

export default function TaskeeSkills() {
    const dispatch = useDispatch();
    const taskeeId = useSelector((state) => state.auth.user.taskeeId);
    const taskeeSkills = useSelector((state) => state.taskee.taskeeSkills);
    const navigate = useNavigate();

    useEffect(() => {
        if (taskeeId) {
            dispatch(getTaskeeSkillsThunk(taskeeId));
        }
    }, [dispatch, taskeeId])

    const handleBack = () => {
        navigate("/account");
    }
    
  return (
    <div>
      <h1>MY SKILLS</h1>
        {taskeeSkills && taskeeSkills.map((skill) => (
            <div className="tasksAndSkills" key={skill.subcategoryId}>
                 {skill.subcategory.subName} - {skill.experience}
            </div>
        ))}
      <button onClick={handleBack}>Back</button>
    </div>
  )
}
