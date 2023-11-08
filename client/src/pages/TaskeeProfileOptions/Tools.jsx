import React from 'react'
import { useNavigate } from 'react-router'

export default function Tools() {

  const navigate = useNavigate();

  const handleSave = () => {

  };
  
  return (
    <div>
      <h1>TOOLS</h1>
      <h3>Tools to get the job done</h3>
      <p>Most clients expect you to have the tools for the task. Highlighting essential and specail tools will make you stand out for potential tasks</p>
      <div>
        <h1>Dolly</h1>
      </div>
      <div>
        <h1>Lawn Mower</h1>
      </div>
      <div>
        <h1>Vacuum</h1>
      </div>
      <div>
        <h1>Carpet Clearner</h1>
      </div>
      <div>
        <h1>Eco-friendly cleanign products</h1>
      </div>
      <div>
        <h1>Power Drill</h1>
      </div>
      <div>
        <h1>Ladder</h1>
      </div>
      <div>
        <h1>Power Saw</h1>
      </div>
      <div>
        <h1>Power Washer</h1>
      </div>
      <div>
        <h1>I don't have any special tools</h1>
      </div>
      <div className="save">
        <button>SAVE</button>
      </div>
    </div>
   
  )
}
