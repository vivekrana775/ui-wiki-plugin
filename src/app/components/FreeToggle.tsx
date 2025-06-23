import React, { useState } from 'react';
// import "./FreeToggle.css";

export default function FreeToggle({isOn , setShowFreeOnly}) {
  // const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setShowFreeOnly((prev) => !prev);
  };

  return (
    <div className='free_toggle_container'>
      <div className={`toggle-container ${isOn ? 'active' : ''}`} onClick={toggleSwitch}>
        <div className="toggle-circle" />
      </div>
      <span className="toggle-label">Free</span>
    </div>
  );
}
