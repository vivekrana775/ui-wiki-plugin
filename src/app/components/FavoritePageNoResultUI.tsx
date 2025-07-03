import React from 'react';
import EmptyFavoritePageIconSvg from '../assets/icons/EmptyFavoritePageIconSvg';

const FavoritePageNoResultUI = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '1px solid red',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        //   border: '1px solid red',
        }}
      >
        <EmptyFavoritePageIconSvg />
        <p
          style={{
            color: '#8B8B8B',
            fontWeight: '400',
            fontSize: '16px',
            width: '100%',
            lineHeight: 'auto',
          }}
        >
          You do not have any favorites yet
        </p>
      </div>
    </div>
  );
};

export default FavoritePageNoResultUI;
