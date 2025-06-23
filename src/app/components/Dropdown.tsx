import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({ options, value, onChange, placeholder, isOpen, setIsOpen }) {
  const ref: any = useRef();

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
        {placeholder}
        <span className={`arrow ${isOpen ? 'rotate' : ''}`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <li>All {placeholder} ({options.length})</li>
        {options.map((opt: any, index: any) => (
          <li key={index}>
            {placeholder=="Collection" && <img className="icon" src={opt?.logoUrl} alt="logo" />}
            {placeholder=="Collection" ? opt.name : opt.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
