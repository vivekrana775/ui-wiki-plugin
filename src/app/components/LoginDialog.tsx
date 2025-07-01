import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import GoogleIcon from '../assets/icons/GoogleIcon';
import TextInput from '../shared/components/TextInput';
import { loginUser } from '../services/authentication';
import { isValidEmail } from '../utils/extensions';
import { handleGoogleSignIn } from '../utils/constant';
import EyeOpenIcon from '../assets/icons/EyeOpenIcon';
import EyeOffIcon from '../assets/icons/EyeOffIcon';
import ErrorMessageIcon from '../assets/icons/ErrorMessageIcon';
import { useGlobalContext } from '../context/GlobalContext';
import { setItemFigmaClientStorage } from '../utils/storage';
import CancelIconSvg from '../assets/icons/CancelIconSvg';
import UiWikiLogoSvg from '../assets/icons/UiWikiLogoSvg';
import { ButtonPrimary, ButtonSecondary } from '../shared/components/Buttons';

type Props = {
  activeDialog: any;
  handleDialog?: any;
};

const LoginDialog: React.FC<Props> = (props) => {
  const { setUserDetails, setActiveLoginDialog, setCurrentPage, fetchUserFavoriteIds } = useGlobalContext();
  // loading state
  const [showLoading, setShowLoading] = useState(false);
  // user details states
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const signinButtonRef = useRef(null);

  // Error handling states
  const [error, setError] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputField1Ref = useRef(null);
  const inputField2Ref = useRef(null);
  const popupRef = useRef<any>(null);

  const validateFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!loginId.trim() || !isValidEmail(loginId)) {
      newErrors.loginId = 'Please enter a valid email address.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const login = async () => {
    setShowLoading(true);
    if (validateFields()) {
      try {
        setError('');

        const data = {
          username: loginId,
          password: password,
        };

        // Await the loginUser function call
        const res: any = await loginUser(data);
        if (res?.data?.token !== undefined && res?.data?.token !== '' && res?.data?.token !== null) {
          setItemFigmaClientStorage('user', JSON.stringify(res.data));
          setItemFigmaClientStorage('userId', JSON.stringify(res.data._id));
          setItemFigmaClientStorage('jsToken', res.data.token);
          setUserDetails(res?.data?.user);

          setActiveLoginDialog(false);
          fetchUserFavoriteIds();
        } else {
          switch (res?.response?.data?.message) {
            case 'Please Verify your email.':
              // router.push("/verify-email", { state: { email: loginId } }); uncomment
              break;
            case 'Failed to authenticate user':
              setError('Invalid Email or password! Please try again.');
              break;
            default:
              setError(res?.response?.data?.message);
              break;
          }
        }
      } catch (error: any) {
        console.log('Something went wrong.');
      } finally {
        setShowLoading(false);
      }
    } else {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        props?.handleDialog(); // close dialog
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    props?.activeDialog && (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.60)',
            zIndex: 5000,
          }}
        >
          {/* Apply blur effect to only this background */}
          <div
            style={{
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              filter: 'blur(62px)',
            }}
          />
        </div>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 6000,
          }}
        >
          {/* <div
            style={{
              position: 'relative',
              display: 'flex',
              // backgroundColor: "#1B1B1B",
              justifyContent: 'center',
              maxWidth: '426px',
              width: '100vw',
              minHeight: '100vh',
              height: '100%',
              // paddingLeft: '0px',
              // paddingRight: '0px',
              // paddingBottom: '0px',
            }}
          > */}
            {/* <div
              style={{
                minHeight: 'auto',
                width: '100%',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
              }}
            > */}
              <div
                className="custom-scrollbar"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  // backgroundColor: "#1B1B1B",
                  scrollbarWidth: 'none',
                  // paddingTop: '60px',
                  // paddingBottom: '40px',
                }}
              >
                {/* yaha se content wala div start hai   */}
                <div
                  ref={popupRef}
                  style={{
                    maxWidth: '426px',
                    minHeight: 'auto',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    gap: '24px',
                    border: '1px solid #3D3D3D',
                    boxSizing: 'border-box',
                    borderRadius: '24px',
                    backgroundColor: '#1B1B1B',
                    padding: '40px',
                    position: 'relative',
                  }}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      props?.handleDialog();
                    }}
                    style={{
                      position: 'absolute',
                      right: '24px',
                      top: '24px',
                      cursor: 'pointer',
                      color: 'white',
                      opacity: '100%',
                    }}
                  >
                    <CancelIconSvg width="18" height="18" />
                  </div>
                  <div
                    onClick={() => {
                      setCurrentPage('HOME');
                      setActiveLoginDialog(false);
                    }}
                    style={{
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                  >
                    <UiWikiLogoSvg />
                  </div>
                  <div
                    style={{
                      margin: '0',
                      padding: '0',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '24px',
                          fontWeight: '600',
                          color: '#FFFFFF',
                          lineHeight: 'auto',
                          fontFamily: 'Inter Tight',
                        }}
                      >
                        Log in to UI Wiki
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                            width: '100%',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                              borderRadius: '14px',
                              margin: '0px',
                              padding: '0px',
                            }}
                          >
                            <TextInput
                              id="LoginEmailInputField"
                              lableStyles={{
                                fontSize: '16px !important',
                                fontWeight: '600',
                              }}
                              labelAstrickStyle={{ color: '#E25454' }}
                              label="Email"
                              placeholder="Email"
                              inputStyles={{
                                borderRadius: '14px',
                                backgroundColor: '#1B1B1B',
                                height: '54px',
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '24px',
                                padding: '15px 16px',
                                color: errors.loginId ? '#E25454' : '#FFFFFF',
                                border: errors.loginId ? '1px solid #E25454' : '0',
                              }}
                              inputWrapStyle={{
                                minWidth: '10px !important',
                                width: '100%',
                              }}
                              // sx={{
                              //   '&::placeholder': {
                              //     color: errors.loginId ? '#E25454' : '#8B8B8B',
                              //   },
                              // }}
                              onChange={(e: any) => {
                                setLoginId(e.target.value);
                              }}
                              onNext={inputField1Ref}
                              value={loginId}
                              required
                            />
                            {errors.loginId && (
                              <p
                                className="err_field"
                                id="emailNotExist"
                                style={{
                                  display: 'flex',
                                  color: '#E25454',
                                  gap: '4px',
                                  marginTop: '12px',
                                  alignItems: 'center',
                                  width: '100%',
                                  fontWeight: '400',
                                  fontSize: '14px',
                                  lineHeight: '16px',
                                  letterSpacing: '8%',
                                }}
                              >
                                {errors.loginId && (
                                  <>
                                    <span>
                                      <ErrorMessageIcon />
                                    </span>
                                    {errors.loginId}
                                  </>
                                )}
                              </p>
                            )}
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                              borderRadius: '12px',
                            }}
                          >
                            <TextInput
                              id="LoginPasswordInputField"
                              lableStyles={{
                                fontSize: '16px !important',
                                fontWeight: '600',
                              }}
                              labelAstrickStyle={{ color: '#E25454' }}
                              label="Password"
                              placeholder="Password"
                              icononclick={() => setPasswordVisible(!passwordVisible)}
                              icon={!passwordVisible ? <EyeOpenIcon /> : <EyeOffIcon />}
                              type={!passwordVisible ? 'password' : 'text'}
                              onChange={(e: any) => {
                                setPassword(e.target.value);
                              }}
                              onNext={inputField2Ref}
                              value={password}
                              required
                              inputWrapStyle={{
                                minWidth: '10px !important',
                                width: '100%',
                              }}
                              inputStyles={{
                                borderRadius: '14px',
                                backgroundColor: '#1B1B1B',
                                height: '54px',
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '24px',
                                paddingLeft: '16px',
                                color: '#FFFFFF',
                                border: errors.password ? '1px solid #E25454' : '0px',
                              }}
                              iconContainerStyles={{ right: '15px' }}
                              iconstyles={{ width: '24px', height: '24px' }}
                            />
                            {errors.password && (
                              <p
                                className="err_field"
                                id="loginPassNotExist"
                                style={{
                                  display: 'flex',
                                  color: '#E25454',
                                  gap: '4px',
                                  marginTop: '12px',
                                  alignItems: 'center',
                                  width: '100%',
                                  fontWeight: '400',
                                  fontSize: '14px',
                                  lineHeight: '16px',
                                  letterSpacing: '8%',
                                }}
                              >
                                {errors.password && (
                                  <>
                                    <span>
                                      <ErrorMessageIcon />
                                    </span>
                                    {errors.password}
                                  </>
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'flex-end',
                            flexWrap: 'wrap',
                          }}
                        >
                          <p
                            onClick={() => {
                              // router.push('/request-reset-password');
                            }}
                            style={{
                              cursor: 'pointer',
                              userSelect: 'none',
                              color: '#FFFFFF',
                              fontSize: '14px',
                              fontWeight: '400',
                              lineHeight: 'auto',
                              fontFamily: 'Inter Tight',
                            }}
                          >
                            Forget Password?
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            // border: '1px solid red',
                          }}
                        >
                          <ButtonPrimary
                            // id="signinButton"
                            sx={{
                              // maxWidth:"346px",
                              width: '346px',
                              height: '54px',
                              textAlign: 'center',
                              textTransform: 'none',
                              borderRadius: '14px',
                            }}
                            // ref={signinButtonRef}
                            onClick={() => {
                              !showLoading && login();
                            }}
                            endIcon={
                              showLoading && (
                                <div
                                  style={{
                                    width: '42px',
                                    height: '42px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  {/* <DefaultLoading width="42px" height="42px" /> */}
                                  Loading...
                                </div>
                              )
                            }
                          >
                            <p
                              style={{
                                color: '#000000',
                                fontSize: '16px !important',
                                fontWeight: '600',
                                lineHeight: 'auto',
                                fontFamily: 'Inter Tight',
                              }}
                            >
                              {!showLoading && 'Sign in'}
                            </p>
                          </ButtonPrimary>
                          {error && (
                            <p
                              style={{
                                display: 'flex',
                                color: '#E25454',
                                gap: '4px',
                                marginTop: '12px',
                                alignItems: 'center',
                                width: '100%',
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '16px',
                                letterSpacing: '8%',
                              }}
                            >
                              {error && (
                                <>
                                  <span>
                                    <ErrorMessageIcon />
                                  </span>
                                  {error}
                                </>
                              )}
                            </p>
                          )}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                          }}
                        >
                          <ButtonSecondary
                            // id="signinButton"
                            sx={{
                              width: '100%',
                              height: '56px',
                              textAlign: 'center',
                              textTransform: 'none',
                              backgroundColor: 'transparent',
                              color: '#FFFFFF',
                              borderRadius: '14px',
                              // paddingY: '0px',
                            }}
                            // ref={signinButtonRef}
                            onClick={() => handleGoogleSignIn()}
                            startIcon={<GoogleIcon />}
                          >
                            <p
                              style={{
                                color: '#FFFFFF',
                                fontWeight: '600',
                                fontSize: '16px !important',
                                lineHeight: 'auto',
                                fontFamily: 'Inter Tight',
                              }}
                            >
                              {'Log in with Google'}
                            </p>
                          </ButtonSecondary>
                        </div>

                        <div>
                          <p
                            style={{
                              fontWeight: '400',
                              fontSize: '14px',
                              lineHeight: 'auto',
                              // color: 'rgba(255, 255, 255, 0.5)',
                              color: '#8B8B8B',
                              textAlign: 'center',
                              padding: '0px',
                              margin: '0px',
                              fontFamily: 'Inter Tight',
                            }}
                          >
                            Don't have an account?{' '}
                            <span
                              onClick={() => {
                                // router.push('/signup');
                              }}
                              style={{
                                fontWeight: '400',
                                color: '#CCFF00',
                                cursor: 'pointer',
                                fontFamily: 'Inter Tight',
                              }}
                            >
                              Sign up
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
          {/* </div> */}
        </div>
      </>
    )
  );
};

export default memo(LoginDialog);
