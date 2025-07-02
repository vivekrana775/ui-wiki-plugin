
import React from 'react';

interface LoaderProps {
  size?: string;
  thickness?: string;
  color?: string;
  trackColor?: string;
}

const DefaultLoading: React.FC<LoaderProps> = ({
  size = '40px',
  thickness = '3px',
  color = '#CCFF00',
  trackColor = '#e0e0e0',
}) => {
  const loaderStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${thickness} solid ${trackColor}`,
    borderTop: `${thickness} solid ${color}`,
    borderLeft: `${thickness} solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <div style={loaderStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default DefaultLoading;
