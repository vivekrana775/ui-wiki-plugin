import React from 'react';

const NoResultUI = ({resetFilters}) => {
  return (
    <div className="empty-state">
      <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012-2z"
        />
      </svg>
      <h3 className="empty-title">No components found</h3>
      <p className="empty-description">Try adjusting your search or filter criteria</p>
      <button onClick={resetFilters} className="empty-action">
        Clear all filters
      </button>
    </div>
  );
};

export default NoResultUI;
