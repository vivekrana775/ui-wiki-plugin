import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const ComponentCard = ({ card }) => {
  const { viewMode } = useGlobalContext();

  return (
    <div className={`component-card ${viewMode === 'list' ? 'list-layout' : ''}`}>
      <div className={`component-preview ${card.backgroundClass} ${viewMode === 'list' ? 'list-view' : ''}`}>
        {/* copy icon  */}
        <div className="copy_icon">
          <span>Copy</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="white" opacity="0.01" />
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              fill="white"
            />
          </svg>
        </div>

        {/* Premium Badge */}
        {card.license === "PREMIUM" && (
          <div className="premium-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6L7 12L12 6L17 12L22 6V20H2V6Z" fill="white" />
              <path d="M4 18H20V8.83L17 12L12 6L7 12L4 8.83V18Z" fill="none" />
            </svg>
          </div>
        )}
        <div>
          <img src={card?.documents[0]?.url} alt={card.title} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
