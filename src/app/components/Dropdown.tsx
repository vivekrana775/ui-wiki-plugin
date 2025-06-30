import React, { useRef, useEffect, useState } from 'react';

export default function Dropdown({
  options = [],
  selectedId = 'all',
  onChange,
  placeholder = 'Select',
  isOpen,
  setIsOpen,
  labelKey = 'value', // Key to display (default: 'value')
  valueKey = '_id', // Key to compare/set (default: 'value')
  showImage = false, // Whether to show image/icon
  imageKey = 'logoUrl', // Image key if showImage is true
}) {
  const ref: any = useRef();
  const [selectedLabel, setSelectedLabel] = useState('');

  // When selectedId changes from parent, update internal label
  useEffect(() => {
    if (selectedId === 'all') {
      setSelectedLabel(`${placeholder}`);
    } else {
      const selectedOption = options.find((opt) => opt[valueKey] === selectedId);
      setSelectedLabel(selectedOption ? selectedOption[labelKey] : placeholder);
    }
  }, [selectedId, options]);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue); // send id to parent
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

  const selectedOption = selectedId !== 'all' ? options.find((opt) => opt[valueKey] === selectedId) : null;

  return (
    <div className="custom-dropdown" ref={ref}>
      <button className={`dropdown-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <span style={{ color:selectedLabel!==placeholder?"#FFF":"#8B8B8B" }} className='dropdown-btn-lable-container'>
          {showImage && selectedOption?.[imageKey] && (
            <img className="icon" src={selectedOption[imageKey]} alt="icon" />
          )}
          {selectedLabel}
        </span>
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
          const isSelected = selectedId === optionValue;
          return (
            <li
              key={index}
              onClick={() => handleSelect(optionValue)}
              style={{
                backgroundColor: isSelected ? '#3D3D3D' : '',
                color: isSelected ? '#FFF' : '',
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
