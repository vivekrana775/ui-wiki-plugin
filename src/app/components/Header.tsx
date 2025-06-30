import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import UserIconSvg from '../assets/icons/UserIconSvg';

const Header = () => {
  const { tabs, activeTab, setActiveTab,setCurrentPage, } = useGlobalContext();
  return (
    <div className="header">
      {/* Navigation */}
      <div className="nav-section">
        <ul className="nav-tabs">
          {tabs.map((tab) => (
            <li
              key={tab.value}
              className={`nav-tab ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {activeTab === tab.value ? tab.activeIcon : tab.icon}
              {tab.label}
            </li>
          ))}
        </ul>
        <div className="user-avatar" onClick={()=>{setCurrentPage("SETTINGS")}}>
          <UserIconSvg />
        </div>
      </div>
    </div>
  );
};

export default Header;
