import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskeeThunk } from '../store/taskee';

export default function TaskeeReviews() {
  const dispatch = useDispatch();
  const taskeeId = useSelector((state) => state.auth.user.taskeeId);
  const taskee = useSelector((state) => state.taskee.singleTaskee);

  useEffect(() => {
    if (taskeeId) {
      dispatch(getTaskeeThunk(taskeeId));
    }
  }, [dispatch, taskeeId]);

  const taskerReviews = taskee?.Task?.flatMap(task => task.tasker.TaskerReview?.filter(review => review.reviewedBy === taskeeId)) || [];

  return (
    <div>
      <h1>Reviews</h1>
      {taskerReviews.length > 0 ? (
        taskerReviews.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.text}</p>
            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
