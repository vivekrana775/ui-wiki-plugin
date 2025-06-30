import React, { useEffect } from 'react';
import CancelIconSvg from '../assets/icons/CancelIconSvg';
import FigmaDesignCopySuccessPopupIconSvg from '../assets/icons/FigmaDesignCopySuccessPopupIconSvg';

type CopySuccessPopupProps = {
  message: string;
  subtitle: string;
  onClose: () => void;
};

const FigmaDesignCopySuccessPopup = (props: CopySuccessPopupProps) => {
     useEffect(() => {
      // Automatically close the popup after 5 seconds
      const timer = setTimeout(() => {
        props?.onClose();
      }, 5000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }, [props?.onClose]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 5000,
          pointerEvents: 'none', // This allows clicks to pass through
        }}
      >
        <div
          style={{
            width: '100vw',
            height: '100vh',
          }}
        />
      </div>

      <div
        style={{
          //   maxWidth: { xs: "90%", sm: "497px", lg: "497px" },
          //   width: { xs: "90%", sm: "497px", lg: "497px" },
          //   maxWidth: "497px",
          width: '100%',
          position: 'fixed',
          bottom: '24px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 6000,
          pointerEvents: 'auto', // This ensures the popup is clickable
        }}
      >
        {/* Mani content Box */}
        <div
          style={{
            // maxWidth: { xs: "90%", sm: "497px", lg: "497px" },
            // width: { xs: "90%", sm: "497px", lg: "497px" },
            maxWidth: '416px',
            minHeight: '68px',
            height: 'auto',
            width: '100%',
            backgroundColor: '#0C0C0C',
            boxShadow: ' inset 0 0 0 1.6px #3D3D3D1F',
            borderRadius: '12px',
            zIndex: 6000,
            padding: '12px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            {/* Cancel Icon  */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                props?.onClose();
              }}
              style={{
                position: 'absolute',
                right: '12px',
                top: '12px',
                cursor: 'pointer',
                color: 'white',
                transition: 'opacity 0.2s ease-in-out',
                opacity: '100%',
              }}
            >
              <CancelIconSvg />
            </div>

            {/* Icon  */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                // marginTop: { xs: "0px", sm: "3px", lg: "3px" },
                marginTop: '3px',
              }}
            >
              <FigmaDesignCopySuccessPopupIconSvg />
            </div>

            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  marginBottom: '3px',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: 'auto',
                  letterSpacing: '0%',
                  color: '#FFF',
                }}
              >
                {props.message}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '22px',
                  letterSpacing: '0%',
                  color: '#8B8B8B',
                }}
              >
                {props.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FigmaDesignCopySuccessPopup;
