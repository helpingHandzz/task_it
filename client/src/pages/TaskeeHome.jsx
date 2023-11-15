import React from 'react'

export default function TaskeeHome() {
  return (
    <div>
      <h1>Hello</h1>
      <h2>Here's a snapshot of today</h2>
      <div>
        <h1>Messages</h1>
      </div>
      <div>
        <h1>Scheduled Tasks</h1>
      </div>
      <div>
        <Link to="/calendar">
        <h1>Set Your Availability</h1>
        <p>Make sure your availability is up to date so clients can hire you for tasks.</p>
        </Link>
      </div>
    </div>
  )
}
