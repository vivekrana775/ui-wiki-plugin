import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export default function FreeToggle() {
  const { showFreeOnly, setShowFreeOnly } = useGlobalContext();

  const toggleSwitch = () => {
    setShowFreeOnly((prev: boolean) => !prev);
  };

  return (
    <div className="free_toggle_container">
      <div className={`toggle-container ${showFreeOnly ? 'active' : ''}`} onClick={toggleSwitch}>
        <div className="toggle-circle" />
      </div>
      <span className="toggle-label">Free</span>
    </div>
  );
}
