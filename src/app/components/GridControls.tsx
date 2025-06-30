import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import MoreGridIconSvg from '../assets/icons/MoreGridIconSvg';
import LessGridIconSvg from '../assets/icons/LessGridIconSvg';

const GridControls = () => {
  const { setViewMode, viewMode } = useGlobalContext();

  return (
    <div className="view-controls">
      <button onClick={() => setViewMode('list')} className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}>
        <MoreGridIconSvg />
      </button>
      <button onClick={() => setViewMode('grid')} className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}>
        <LessGridIconSvg />
      </button>
    </div>
  );
};

export default GridControls;
