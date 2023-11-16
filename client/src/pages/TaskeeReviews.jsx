import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskeeReviewsThunk } from '../store/taskee';
import { useNavigate } from 'react-router';

export default function TaskeeReviews() {
  const dispatch = useDispatch();
  const taskeeId = useSelector((state) => state.auth.user.taskeeId);
  const reviews = useSelector((state) => state.taskee.taskeeReviews);

  useEffect(() => {
    if (taskeeId) {
      dispatch(getTaskeeReviewsThunk(taskeeId));
    }
  }, [dispatch, taskeeId]);

  const handleBack = () => {
    navigate("/account");
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center p-4'>Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border shadow-md bg-white my-4 mx-4 p-3 mb-4">
              <p>Review by: {review.tasker?.fName} {review.tasker?.lName.charAt(0)}.</p>
              {renderStars(review.rating)}
              <p>Review: {review.text}</p>
              <p>Date: {new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <button onClick={handleBack} className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded m-4">BACK</button>
    </div>
  );
}
