import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const SearchComponent = () => {
  const { localSearch,setLocalSearch,setSearchQuery } = useGlobalContext();
  

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(localSearch.trim());
    }, 500);

    return () => clearTimeout(debounce);
  }, [localSearch]);

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  return (
    <div className="search-container">
      <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search components, tags..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="search-input"
      />
      {localSearch && (
        <button onClick={handleClearSearch} className="search-clear">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchComponent;
