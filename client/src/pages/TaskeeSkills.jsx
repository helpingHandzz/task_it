import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
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
    }, [dispatch, taskeeId]);

    const handleBack = () => {
        navigate("/account");
    };

    return (
        <>
            <div>
                <h1 className='text-3xl font-bold text-center p-4'>My Skills</h1>
                {taskeeSkills && taskeeSkills.map((skill, index) => (
                    <div className="border shadow-md bg-white my-4 mx-4 p-3 mb-4" key={index}>
                        <h2 className='m-2 text-xl font-bold'>{skill.subcategory.subName}</h2>
                        <h3 className='m-2'>My Experience: {skill.experience}</h3>
                    </div>
                ))}
            </div>
            <button onClick={handleBack} className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded m-4">BACK</button>
        </>
    );
}
