import React, { useRef, useEffect } from 'react';

export default function Dropdown({
  options = [],
  value = 'all',
  onChange,
  placeholder = 'Select',
  isOpen,
  setIsOpen,
  labelKey = 'value', // Key to display (default: 'value')
  valueKey = 'value', // Key to compare/set (default: 'value')
  showImage = false, // Whether to show image/icon
  imageKey = 'logoUrl', // Image key if showImage is true
}) {
  const ref: any = useRef();

  // Determine label to show on button
  const getSelectedLabel = () => {
    if (value === 'all') return `All ${placeholder}`;
    const selectedOption = options.find((opt) => opt[valueKey] === value);
    return selectedOption?.[labelKey] || placeholder;
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={ref}>
      <button className={`dropdown-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen((prev) => !prev)}>
        {getSelectedLabel()}
        <span className={`arrow ${isOpen ? 'rotate' : ''}`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <li onClick={() => handleSelect('all')}>
          All {placeholder} ({options.length})
        </li>
        {options.map((opt: any, index: any) => {
          const optionValue = opt[valueKey];
          const isSelected = value === optionValue;
          return (
            <li
              key={index}
              onClick={() => handleSelect(optionValue)}
              style={{
                backgroundColor: isSelected ? '#f1f0ff' : '',
              }}
            >
              {showImage && opt[imageKey] && <img className="icon" src={opt[imageKey]} alt="icon" />}
              {opt[labelKey]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
