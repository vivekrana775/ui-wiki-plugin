import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { ButtonPrimary } from '../shared/components/Buttons';
import MagnifierSearchIcon from '../assets/icons/MagnifierSearchIcon';

const NoResultUI = () => {
  const { resetFilters } = useGlobalContext();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // height: '95%',
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
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          // border: '1px solid red',
        }}
      >
        <div>
          <MagnifierSearchIcon width='70' height='80'/>
        </div>
        <p
          style={{
            color: 'white',
            fontWeight: '600',
            // fontSize: '24px',
            fontSize: '18px',
            // lineHeight: '28px',
            lineHeight: 'auto',
            width:"100%",
          }}
        >
          Sorry! No results found
        </p>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: '400',
            // fontSize: '14px',
            fontSize: '12px',
            lineHeight: '22px',
            width:"100%",
          }}
        >
          Please adjust the filter or try modifying the search text.
        </p>
        <ButtonPrimary
          onClick={resetFilters}
          sx={{
            // height: '48px',
            height: '40px',
            // width: '141px',
            width: '131px',
            borderRadius: '50px',
          }}
          LabelStyle={{ fontSize: '13px', fontWeight: '600' }}
          label="Reset Filter"
        />
      </div>
    </div>
  );
};

export default NoResultUI;
