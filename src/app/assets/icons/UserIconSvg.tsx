import React from 'react';

const UserIconSvg = ({ width = '22px', height = '22px', color = 'white' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.0005 11.0009C12.9445 11.0009 14.5205 9.42498 14.5205 7.48094C14.5205 5.5369 12.9445 3.96094 11.0005 3.96094C9.05643 3.96094 7.48047 5.5369 7.48047 7.48094C7.48047 9.42498 9.05643 11.0009 11.0005 11.0009Z"
        stroke={color}
        stroke-width="1.584"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2807 16.2073C16.2807 17.3289 13.6407 18.0406 11.0007 18.0406C7.9207 18.0406 5.7207 17.3289 5.7207 16.2073C5.7207 14.5714 8.3607 13.6406 11.0007 13.6406C13.6407 13.6406 16.2807 14.7406 16.2807 16.2073Z"
        stroke={color}
        stroke-width="1.584"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UserIconSvg;
