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
      <h1 className='text-3xl font-bold text-center p-4'>My Skills</h1>
        {taskeeSkills && taskeeSkills.map((skill) => (
            <div className="tasksAndSkills border-4 m-4 rounded-lg text-xl" key={skill.subcategoryId}>
                 <h2 className='m-2'>{skill.subcategory.subName}</h2>
                 <h3 className='m-2'>My Experience: {skill.experience}</h3>
            </div>
        ))}
      <button onClick={handleBack} className='text-xl font-bold'>BACK</button>
    </div>
  )
}
