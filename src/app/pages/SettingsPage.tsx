import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import SignoutIconSvg from '../assets/icons/SignOutIconSvg';
import UserImage from '../assets/UserImage.svg';
// import SettingBottomImage from '../assets/settingBottomImage.svg';
import SettingBottomImagePNG from '../assets/settingBottomImagePNG.png';
import FavoriteIconSvg from '../assets/icons/FavoriteIconSvg';
import SupportHeadphoneIcon from '../assets/icons/SupportHeadphoneIcon';
import QuestionMarkIconSvg from '../assets/icons/QuestionMarkIconSvg';
import { removeItemFigmaClientStorage } from '../utils/storage';
import avatarMap from '../utils/avatarMap';

const SettingsPage = () => {
  const { setCurrentPage, userDetails, setUserDetails } = useGlobalContext();

  // Step 1: Extract  filename from Secondary Avatar  
  const secondaryAvatar = userDetails?.secondaryAvatar;
  let secondaryAvatarFileName = null;

  if (secondaryAvatar) {
    const parts = secondaryAvatar.split('/');
    const lastPart = parts[parts.length - 1];  // Example: UiWikiAvt6.1282d051.png
    const match = lastPart.match(/(UiWikiAvt\d+)\./);  
    if (match) {
      secondaryAvatarFileName = `${match[1]}.png`;  // Example: UiWikiAvt6.png
    }
  }
  
  // Step 2: Final Avatar Path decide karo
  const avatarSrc = userDetails?.avatar?.trim()
  ? userDetails.avatar
  : secondaryAvatarFileName && avatarMap[secondaryAvatarFileName]
  ? avatarMap[secondaryAvatarFileName]
  : UserImage;
  
  const userName =
    userDetails?.firstName && userDetails?.lastName
      ? `${userDetails.firstName} ${userDetails.lastName}`
      : userDetails?.firstName
      ? userDetails.firstName
      : userDetails?.lastName
      ? userDetails.lastName
      : 'David Kim';
  const userEmail = userDetails?.email || 'david23@gmail.com';

  const handleLogout = async () => {
    await Promise.all([
      removeItemFigmaClientStorage('jsToken'),
      removeItemFigmaClientStorage('user'),
      removeItemFigmaClientStorage('userId'),
    ]);
    setUserDetails(null);
    setCurrentPage('HOME');
  };

  return (
    <div className="setting_container">
      <div className="setting_head">
        <span
          onClick={() => {
            setCurrentPage('HOME');
          }}
          className="setting_head_icon"
        >
          <LeftArrowIcon />
        </span>
        <span className="setting_head_title">Settings</span>
      </div>
      <div className="setting_mid_container">
        <div className="setting_user_details">
          <div className="setting_user_img">
            <div style={{ width: '50px', height: '50px' }}>
              <img
                src={avatarSrc}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '50px',
                  height: '50px',
                }}
                alt="Profile"
              />
            </div>
            <div>
              <p className="setting_username">{userName}</p>
              <p className="setting_email">{userEmail}</p>
            </div>
          </div>
          <button onClick={handleLogout}>
            <span>
              <SignoutIconSvg />
            </span>
            Sign out
          </button>
        </div>
        <div className="setting_support_container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div onClick={() => setCurrentPage('FAVORITES')} className="setting_support_card">
              <div className="setting_card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>
                    <FavoriteIconSvg color="#FFFFFF" />
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600', lineHeight: '22px', color: '#FFFFFF' }}>
                    Favorites
                  </span>
                </div>
                <span
                  style={{
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '22px',
                    color: '#8B8B8B',
                  }}
                >
                  View saved/copied/favorite components
                </span>
              </div>
            </div>
            <div className="setting_support_card">
              <div className="setting_card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>
                    <QuestionMarkIconSvg />
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600', lineHeight: '22px', color: '#FFFFFF' }}>
                    Help Center
                  </span>
                </div>
                <span
                  style={{
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '22px',
                    color: '#8B8B8B',
                  }}
                >
                  Visit our help centre for quick start guides
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="setting_support_card">
              <div className="setting_card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>
                    <SupportHeadphoneIcon />
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600', lineHeight: '22px', color: '#FFFFFF' }}>
                    Support
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '22px',
                      color: '#8B8B8B',
                      marginBottom: '8px',
                    }}
                  >
                    Need some help?
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '22px',
                      color: '#CCFF00',
                    }}
                  >
                    support @uiwiki.co
                  </p>
                </div>
              </div>
            </div>
            <div className="setting_support_card">
              <div className="setting_card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>
                    <SupportHeadphoneIcon />
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600', lineHeight: '22px', color: '#FFFFFF' }}>
                    Support
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '22px',
                      color: '#8B8B8B',
                      marginBottom: '8px',
                    }}
                  >
                    Need some help?
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '22px',
                      color: '#CCFF00',
                    }}
                  >
                    support @uiwiki.co
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="setting_bottom_image">
          {/* <img src={SettingBottomImage} alt="bottomImage" /> */}
          <img src={SettingBottomImagePNG} alt="bottomImage" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
