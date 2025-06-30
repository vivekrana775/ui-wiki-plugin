import React from "react";
interface ButtonProps {
  endIcon?: any;
  startIcon?: any;
  label?: string;
  onClick?: any;
  sx?: any;
  isLoading?: boolean;
  disabled?: boolean;
  textStyle?: any;
  LabelStyle?: any;
  tooltipTitle?: string;
  loadingColor?: any;
  notHover?: any;
}

export const ButtonPrimary: React.FC<ButtonProps & { children?: React.ReactNode }> = ({
  endIcon,
  label,
  onClick,
  sx,
  isLoading,
  disabled,
  LabelStyle,
  tooltipTitle,
  loadingColor,
  notHover,
  children,
}) => {
  return (
    <div title={tooltipTitle || ""} style={{ display: "inline-block" }}>
      <button
        disabled={isLoading || disabled}
        onClick={onClick}
        style={{
          backgroundColor: "#CCFF00",
          color: "#000000",
          width:"100%",
          borderRadius: "14px",
          height: "54px",
          textTransform: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 0.5s ease",
          ...sx,
        }}
        className={!notHover ? "primary-btn-hover" : ""}
      >
        {children ? (
          children
        ) : (
          !isLoading && (
            <span
              style={{
                fontWeight: 600,
                textAlign: "center",
                ...LabelStyle,
              }}
            >
              {label}
            </span>
          )
        )}
        {isLoading ? (
          <span
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "8px",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "24px",
                border: `3px solid ${loadingColor || "#000"}`,
                borderTop: "3px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></span>
          </span>
        ) : (
          endIcon && <span style={{ marginLeft: "8px" }}>{endIcon}</span>
        )}
      </button>
    </div>
  );
};



export const ButtonSecondary: React.FC<ButtonProps & { children?: React.ReactNode }> = ({
  endIcon,
  startIcon,
  onClick,
  LabelStyle = {},
  disabled,
  sx = {},
  children,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        color: "white",
        padding: "16px 24px",
        borderRadius: "16px",
        height: "52px",
        border: "1.6px solid #3D3D3D",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: "none",
        ...sx,
      }}
      className="secondary-btn-hover"
    >
      {startIcon && <span style={{ marginRight: "8px" }}>{startIcon}</span>}
      <span
        style={{
          fontWeight: 600,
          textAlign: "center",
          ...LabelStyle,
        }}
      >
        {children}
      </span>
      {endIcon && <span style={{ marginLeft: "8px" }}>{endIcon}</span>}
    </button>
  );
};
