import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskeeReviewsThunk } from '../store/taskee';
import StarRatings from 'react-star-ratings';

export default function TaskeeReviews() {
  const dispatch = useDispatch();
  const taskeeId = useSelector((state) => state.auth.user.taskeeId);
  const reviews = useSelector((state) => state.taskee.taskeeReviews);

  useEffect(() => {
    if (taskeeId) {
      dispatch(getTaskeeReviewsThunk(taskeeId));
    }
  }, [dispatch, taskeeId]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="mb-4">
            <p>Review by: {review.tasker?.fName} {review.tasker?.lName.charAt(0)}.</p>
            <StarRatings
              rating={review.rating}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="25px"
              starSpacing="1px"
            />
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
