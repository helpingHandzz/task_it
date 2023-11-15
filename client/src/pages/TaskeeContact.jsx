import React, { useState } from 'react'

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true); 
  };

  if (isSubmitted) {
    return (
      <div className='m-4'>
        <h1 className='text-3xl font-bold text-center p-4'>Thank you for contacting us!</h1>
        <p className='text-center'>Your message has been sent successfully. We will get back to you soon.</p>
      </div>
    );
  }
    
  return (
    <div className='m-4'>
      <h1 className='text-3xl font-bold text-center p-4'>Support</h1>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto space-y-4'>
        <div>
          <label htmlFor="fname" className="block mb-2">First Name:</label>
          <input type="text" id="fname" name="fname" className="border border-gray-300 p-2 w-full"/>
        </div>
        <div>
          <label htmlFor="lname" className="block mb-2">Last Name:</label>
          <input type="text" id="lname" name="lname" className="border border-gray-300 p-2 w-full"/>
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input type="text" id="email" name="email" className="border border-gray-300 p-2 w-full"/>
        </div>
        <div>
          <label htmlFor="topics" className="block mb-2">Pick A Topic:</label>
          <select name="topics" id="topics" className="border border-gray-300 p-2 w-full">
              <option value="Account">Account</option>
              <option value="Skills">Skills</option>
              <option value="Schedule">Schedule</option>
              <option value="Task">Taskee</option>
              <option value="Tasker">Tasker</option>
              <option value="Other">Other</option>
          </select>
        </div>
        <p>Please leave us a detailed message as to what issue you are currently experiencing and we will respond promptly to resolve your issue.</p>
        <textarea className='border border-gray-300 p-2 w-full h-40'></textarea>
        <div className='flex justify-center'>
        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        </div>
      </form>
    </div>
  )
}
