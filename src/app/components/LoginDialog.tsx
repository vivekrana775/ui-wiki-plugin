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

// const LoginDialog: React.FC<Props> = (props) => {
//   const { setUserDetails, setActiveLoginDialog } = useGlobalContext();

//   // loading state
//   const [showLoading, setShowLoading] = useState(false);

//   // user details states
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const signinButtonRef = useRef(null);

//   // Error handling states
//   const [error, setError] = useState<string>();
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const inputField1Ref = useRef(null);
//   const inputField2Ref = useRef(null);

//   const validateFields = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!loginId.trim() || !isValidEmail(loginId)) {
//       newErrors.loginId = 'Please enter a valid email address.';
//     }

//     if (!password.trim()) {
//       newErrors.password = 'Password is required.';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };
//   const login = async () => {
//     setShowLoading(true);
//     if (validateFields()) {
//       try {
//         setError('');

//         const data = {
//           username: loginId,
//           password: password,
//         };

//         // Await the loginUser function call
//         const res: any = await loginUser(data);
//         if (res?.data?.token !== undefined && res?.data?.token !== '' && res?.data?.token !== null) {
//           localStorage.setItem('jstoken', res.data.token);
//           setItemFigmaClientStorage('user', JSON.stringify(res.data));
//           setItemFigmaClientStorage('userId', JSON.stringify(res.data._id));
//           setItemFigmaClientStorage('jsToken', res.data.token);
//           setUserDetails(res?.data?.user);

//           setActiveLoginDialog(false);
//           //   fetchUserFavoriteIds();
//         } else {
//           switch (res?.response?.data?.message) {
//             case 'Please Verify your email.':
//               // router.push("/verify-email", { state: { email: loginId } }); uncomment
//               break;
//             case 'Failed to authenticate user':
//               setError('Invalid Email or password! Please try again.');
//               break;
//             default:
//               setError(res?.response?.data?.message);
//               break;
//           }
//         }
//       } catch (error: any) {
//         console.log('Something went wrong.');
//       } finally {
//         setShowLoading(false);
//       }
//     } else {
//       setShowLoading(false);
//     }
//   };

//   //   const handleEnterKeyPress = useCallback(() => {
//   //     !showLoading && login();
//   //   }, [showLoading, login]);

//   // Use the custom hook
//   //   useEnterKeyPress(handleEnterKeyPress);

//   useEffect(() => {}, [props?.activeDialog]);
//   return (
//     props?.activeDialog && (
//       <>
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.60)',
//             zIndex: 5000,
//           }}
//         >
//           {/* Apply blur effect to only this background */}
//           <div
//             style={{
//               width: '100vw',
//               height: '100vh',
//               backgroundColor: 'rgba(0, 0, 0, 0)',
//               filter: 'blur(62px)',
//             }}
//           />
//         </div>

//         <div
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             zIndex: 6000,
//           }}
//         >
//           <div
//             style={{
//               padding: '40px',
//               height: 'auto',
//               maxWidth: '426px',
//               width: '100vw',
//               backgroundColor: '#1B1B1B',
//               borderRadius: '24px',
//               border: '1px solid #3D3D3D',
//               cursor: 'default',
//               position: 'relative',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             {/* Dialog content */}
//             {/* <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 props?.handleDialog();
//               }}
//               style={{
//                 position: 'absolute',
//                 right: '24px',
//                 top: '24px',
//                 cursor: 'pointer',
//                 color: 'white',
//                 opacity: '70%',
//                 transition: 'opacity 0.2s ease-in-out',
//               }}
//             >
//               <CancelIconSvg />
//             </div> */}

//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 width: '100%',
//                 justifyContent: 'center',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   textAlign: 'center',
//                   width: '100%',
//                   marginBottom: '24px',
//                 }}
//               >
//                 <p
//                   style={{
//                     fontWeight: '600',
//                     fontSize: '24px !important',
//                     color: 'text.secondary',
//                     lineHeight: 'auto',
//                   }}
//                 >
//                   Sign in
//                 </p>
//               </div>

//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   gap: '16px',
//                   width: '100%',
//                 }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     gap: '24px',
//                     width: '100%',
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       width: '100%',
//                       borderRadius: '14px',
//                       maxWidth: '400px',
//                       padding: '0',
//                     }}
//                   >
//                     <TextInput
//                       id="loginPopupinputFields"
//                       lableStyles={{
//                         fontWeight: '600',
//                         fontSize: '16px !important',
//                       }}
//                       labelAstrickStyle={{ color: '#E25454' }}
//                       label="Email"
//                       placeholder="Email"
//                       onChange={(e: any) => {
//                         setLoginId(e.target.value);
//                       }}
//                       error={errors.loginId}
//                       inputStyles={{
//                         borderRadius: '14px',
//                         height: '54px',
//                         fontSize: '14px',
//                         fontWeight: '400',
//                         lineHeight: 'auto',
//                         padding: '16px',
//                         color: '#FFFFFF',
//                         border: errors.loginId ? '1px solid #E25454' : '0',
//                       }}
//                       sx={{
//                         '&::placeholder': {
//                           color: errors.loginId ? '#E25454' : '#FFFFFF80',
//                         },
//                       }}
//                       onNext={inputField1Ref}
//                       value={loginId}
//                       required
//                     />
//                     {errors.loginId && (
//                       <p
//                         className="err_field"
//                         id="emailNotExist"
//                         color="#E25454"
//                         // variant="body2"
//                         style={{
//                           display: 'flex',
//                           gap: '4px',
//                           marginTop: '12px',
//                           alignItems: 'center',
//                           width: '100%',
//                           fontWeight: '400',
//                           fontSize: '14px',
//                           lineHeight: '16px',
//                           letterSpacing: '8%',
//                         }}
//                       >
//                         {errors.loginId && (
//                           <>
//                             <span>
//                               <ErrorMessageIcon />
//                             </span>
//                             {errors.loginId}
//                           </>
//                         )}
//                       </p>
//                     )}
//                   </div>

//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       width: '100%',
//                       borderRadius: '12px',
//                       maxWidth: '400px',
//                       padding: '0',
//                     }}
//                   >
//                     <TextInput
//                       id="loginPopupinputFields"
//                       lableStyles={{
//                         fontWeight: '600',
//                         fontSize: '16px !important',
//                       }}
//                       label="Password"
//                       placeholder="Password"
//                       icononclick={() => setPasswordVisible(!passwordVisible)}
//                       icon={passwordVisible ? <EyeOpenIcon /> : <EyeOffIcon />}
//                       type={!passwordVisible ? 'password' : 'text'}
//                       onChange={(e: any) => {
//                         setPassword(e.target.value);
//                       }}
//                       inputStyles={{
//                         borderRadius: '14px',
//                         height: '54px',
//                         fontSize: '14px',
//                         padding: '16px',
//                         color: '#FFFFFF',
//                         border: errors.password ? '1px solid #E25454' : '0px',
//                       }}
//                       onNext={inputField2Ref}
//                       value={password}
//                       required
//                       iconstyles={{ width: '17px', height: '15px' }}
//                     />
//                     {errors.password && (
//                       <p
//                         className="err_field"
//                         id="loginPassNotExist"
//                         color="#E25454"
//                         // variant="body2"
//                         style={{
//                           display: 'flex',
//                           gap: '4px',
//                           marginTop: '12px',
//                           alignItems: 'center',
//                           width: '100%',
//                           fontWeight: '400',
//                           fontSize: '14px',
//                           lineHeight: '16px',
//                           letterSpacing: '8%',
//                         }}
//                       >
//                         {errors.password && (
//                           <>
//                             <span>
//                               <ErrorMessageIcon />
//                             </span>
//                             {errors.password}
//                           </>
//                         )}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: '16px',
//                     width: '100%',
//                     justifyContent: 'flex-end',
//                     maxWidth: '400px',
//                     flexWrap: 'wrap',
//                   }}
//                 >
//                   <p
//                     onClick={() => {
//                       setActiveLoginDialog(false);
//                     }}
//                     style={{
//                       userSelect: 'none',
//                       color: 'text.secondary',
//                       cursor: 'pointer',
//                       fontSize: '16px',
//                       fontWeight: '400',
//                     }}
//                   >
//                     Forgot password?
//                   </p>
//                 </div>
//               </div>

//               <div
//                 style={{
//                   width: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   maxWidth: '400px',
//                   marginTop: '32px',
//                 }}
//               >
//                 <button
//                   id="signinButton"
//                   style={{
//                     width: '100%',
//                     height: '54px',
//                     textAlign: 'center',
//                     textTransform: 'none',
//                     backgroundColor: 'primary.main',
//                     // border: "1px solid #718B08",
//                     color: '#FFFFFF',
//                     borderRadius: '14px',
//                     padding: '16px 0px',
//                     transition: 'background-color 0.3s ease',
//                   }}
//                   ref={signinButtonRef}
//                   onClick={() => {
//                     !showLoading && login();
//                   }}
//                   //   endIcon={
//                   //     showLoading && (
//                   //       <Box
//                   //         sx={{
//                   //           width: '42px',
//                   //           height: '42px',
//                   //           justifyContent: 'center',
//                   //           alignItems: 'center',
//                   //         }}
//                   //       >
//                   //         <DefaultLoading width="42px" height="42px" />
//                   //       </Box>
//                   //     )
//                   //   }
//                 >
//                   <p
//                     style={{
//                       color: 'text.primary',
//                       fontWeight: '600',
//                       fontSize: '16px !important',
//                     }}
//                   >
//                     {!showLoading && 'Sign in'}
//                   </p>
//                 </button>
//                 {error && (
//                   <p
//                     style={{
//                       width: '100%',
//                       fontWeight: '400',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px',
//                       fontSize: '14px',
//                       lineHeight: '16px',
//                       letterSpacing: '8%',
//                       marginTop: '12px',
//                       color: '#E25454',
//                     }}
//                   >
//                     {error && (
//                       <>
//                         <span>
//                           <ErrorMessageIcon />
//                         </span>
//                         {error}
//                       </>
//                     )}
//                   </p>
//                 )}

//                 <p
//                   style={{
//                     fontWeight: '400',
//                     fontSize: '16px',
//                     color: 'rgba(255, 255, 255, 0.5)',
//                     marginTop: '16px',
//                   }}
//                 >
//                   Don't have an account yet?{' '}
//                   <span
//                     onClick={() => {
//                       setActiveLoginDialog(false);
//                     }}
//                     style={{
//                       fontWeight: '400',
//                       color: '#CCFF00',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     Sign up
//                   </span>
//                 </p>
//               </div>

//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   width: '100%',
//                   gap: '24px',
//                   marginTop: '24px',
//                 }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     width: '100%',
//                     gap: '30px',
//                   }}
//                 >
//                   <hr
//                     style={{
//                       backgroundColor: '#FFFFFF',
//                       opacity: '50%',
//                       border: 'none',
//                       flex: 1,
//                       height: '0.5px',
//                     }}
//                   />
//                   <p style={{ color: '#A2AB9C' }}>OR</p>
//                   <hr
//                     style={{
//                       backgroundColor: '#FFFFFF',
//                       opacity: '50%',
//                       border: 'none',
//                       flex: 1,
//                       height: '0.5px',
//                     }}
//                   />
//                 </div>

//                 <button
//                   id="signinButton"
//                   style={{
//                     width: '100%',
//                     height: '56px',
//                     textAlign: 'center',
//                     textTransform: 'none',
//                     // backgroundColor: ,
//                     boxShadow: 'inset 0px 0px 0px 1px #3D3D3D',
//                     color: '#FFFFFF',
//                     borderRadius: '14px',
//                     padding: '16px 0px',
//                     // '&:hover': {
//                     //   bgcolor: colors.primaryGrey,
//                     //   boxShadow: 'inset 0px 0px 0px 0.6px #B9B9B9',
//                     // },
//                   }}
//                   ref={signinButtonRef}
//                   onClick={() => handleGoogleSignIn()}
//                   //   startIcon={<Image width={24} height={24} alt="google" src={GoogleIcon} quality={100} />}
//                 >
//                   <p
//                     style={{
//                       color: 'text.secondary',
//                       fontWeight: '600',
//                       fontSize: '16px !important',
//                     }}
//                   >
//                     {'Log in with Google'}
//                   </p>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     )
//   );
// };

// export default memo(LoginDialog);

const LoginDialog: React.FC<Props> = (props) => {
  const { setUserDetails, setActiveLoginDialog, setCurrentPage } = useGlobalContext();
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
          //   fetchUserFavoriteIds();
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
          <div
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
          >
            <div
              style={{
                minHeight: 'auto',
                width: '100%',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
              }}
            >
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
                  }}
                >
                  <div
                    onClick={() => {
                      setCurrentPage('HOME');
                      setActiveLoginDialog(false)
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
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default memo(LoginDialog);
