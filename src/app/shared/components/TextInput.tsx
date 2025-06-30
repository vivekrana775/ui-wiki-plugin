import React, { CSSProperties, memo, useEffect, useRef } from 'react';
interface textInputProps {
  iconstyles?: any;
  iconContainerStyles?: any;
  label?: string;
  icon?: any;
  copy?: any;
  currency?: any;
  type?: string;
  place?: any;
  inputOnKeyUp?: any;
  warningIcon?: any;
  checkicon?: any;
  inputId?: any;
  warningIconId?: any;
  inputIconId?: any;
  validateSuccessIcon?: any;
  phoneNumInitials?: any;
  loading?: boolean;
  [x: string]: any;
  required?: boolean;
  icononclick?: () => void;
  textinputstyles?: CSSProperties;
  lableStyles?: CSSProperties;
  inputStyles?: CSSProperties;
  inputWrapStyle?: any;
  placeholderFontSize?: any;
  labelAstrickStyle?: CSSProperties;
}

const TextInput: React.FC<textInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cursorPosition = e.target.selectionStart;
    props.onChange(e);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  };

  useEffect(() => {
    if (inputRef.current && props.value !== undefined) {
      inputRef.current.value = props.value;
    }
  }, [props.value]);

  return (
    <div
      style={{
        gap: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        ...props.textinputstyles,
      }}
    >
      {props.label && (
        <div>
          <p
            style={{
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Inter Tight',
              color: '#FFFFFF',
              letterSpacing: '0%',
              ...props?.lableStyles,
            }}
          >
            {props.label}
            {props?.required && (
              <p
                style={{
                  color: 'red',
                  marginLeft: '2px',
                  ...props?.labelAstrickStyle,
                }}
              >
                *
              </p>
            )}
          </p>
        </div>
      )}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minWidth: '200px',
          width: '100%',
          '@media screen and (max-width: 600px)': {
            minWidth: '231px',
          },
          ...props.inputWrapStyle,
        }}
      >
        <input
          style={{
            width: '100%',
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '20px',
            height: '52px',
            paddingRight: '20px',
            borderRadius: '12px',
            border: ' 1.6px solid #3D3D3D',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            color: 'white',
            // fontSize: "14px",
            fontFamily: 'Inter Tight',
            fontWeight: '400',
            outline: 'none',
            lineHeight: '100%',

            boxShadow: 'inset 0px 0px 0px 1px #3D3D3D',
            ...props.inputStyles,
          }}
          type={props?.type}
          autoComplete="false"
          id={props.inputId}
          // className={styles.input}
          //   className={cn(styles.input, { error: props.error })} // Add error class conditionally
          value={
            props?.loading ? (
              <div
                style={{
                  width: '24px',
                  height: '24px',
                }}
              >
                Loading...
              </div>
            ) : (
              props?.value
            )
          }
          onChange={handleChange}
          {...props}
        />
        {props.icon && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              ...props.iconContainerStyles,
            }}
            onClick={props.icononclick}
            id={props.inputIconId}
          >
            {React.isValidElement(props.icon) ? (
              props.icon
            ) : (
              <img style={props.iconstyles} src={props.icon} alt="icon" />
            )}
          </div>
        )}
        {props.warningIcon && <div className="emailvalidationicon" id={props.warningIconId}></div>}
        {props.checkicon && (
          <div
            style={{ position: 'absolute', top: 0, bottom: 0, right: '20px', display: 'flex', alignItems: 'center' }}
            id={props.validateSuccessIcon}
          >
            <img width={14} height={10} src={props.checkicon} alt="check" />
          </div>
        )}
        {props.copy && <button></button>}
        {props?.loading ? (
          <div
            style={{
              width: '42px',
              height: '42px',
              position: 'absolute',
              left: '20px',
            }}
          >
            Loading...
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default memo(TextInput);
