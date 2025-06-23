import React, { useState } from 'react';

const Header = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="header">
      <div className="skyblue_circle"></div>
      <div className="white_circle"></div>

      {/* Navigation */}
      <div className="nav-section">
        <ul className="nav-tabs">
          {tabs.map((tab) => (
            <li key={tab} className={`nav-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </li>
          ))}
        </ul>
        <div className="user-avatar">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
