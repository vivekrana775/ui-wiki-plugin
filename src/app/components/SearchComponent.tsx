import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import SearchComponentCancelIconSvg from '../assets/icons/SearchComponentCancelIconsvg';

const SearchComponent = () => {
  const { localSearch, setLocalSearch, setSearchQuery } = useGlobalContext();

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
      <svg
        className="search-icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2583 15.243L14.425 12.418C15.3392 11.2534 15.8352 9.81518 15.8333 8.33464C15.8333 7.0161 15.4423 5.72716 14.7098 4.63084C13.9773 3.53451 12.9361 2.68003 11.7179 2.17544C10.4997 1.67086 9.15927 1.53884 7.86607 1.79607C6.57286 2.0533 5.38497 2.68824 4.45262 3.62059C3.52027 4.55294 2.88534 5.74083 2.6281 7.03404C2.37087 8.32724 2.50289 9.66769 3.00747 10.8859C3.51206 12.104 4.36654 13.1452 5.46287 13.8778C6.5592 14.6103 7.84813 15.0013 9.16667 15.0013C10.6472 15.0031 12.0854 14.5071 13.25 13.593L16.075 16.4263C16.1525 16.5044 16.2446 16.5664 16.3462 16.6087C16.4477 16.651 16.5567 16.6728 16.6667 16.6728C16.7767 16.6728 16.8856 16.651 16.9872 16.6087C17.0887 16.5664 17.1809 16.5044 17.2583 16.4263C17.3364 16.3488 17.3984 16.2567 17.4407 16.1551C17.4831 16.0536 17.5048 15.9446 17.5048 15.8346C17.5048 15.7246 17.4831 15.6157 17.4407 15.5142C17.3984 15.4126 17.3364 15.3204 17.2583 15.243ZM4.16667 8.33464C4.16667 7.34573 4.45991 6.37903 5.00932 5.55679C5.55873 4.73454 6.33962 4.09368 7.25325 3.71524C8.16688 3.3368 9.17222 3.23779 10.1421 3.43071C11.112 3.62364 12.0029 4.09984 12.7022 4.7991C13.4015 5.49837 13.8777 6.38928 14.0706 7.35919C14.2635 8.32909 14.1645 9.33442 13.7861 10.2481C13.4076 11.1617 12.7668 11.9426 11.9445 12.492C11.1223 13.0414 10.1556 13.3346 9.16667 13.3346C7.84059 13.3346 6.56882 12.8079 5.63114 11.8702C4.69345 10.9325 4.16667 9.66072 4.16667 8.33464Z"
          fill="#8B8B8B"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="search-input"
      />
      {localSearch && (
        <button onClick={handleClearSearch} className="search-clear">
          <SearchComponentCancelIconSvg />
        </button>
      )}
    </div>
  );
};

export default SearchComponent;
