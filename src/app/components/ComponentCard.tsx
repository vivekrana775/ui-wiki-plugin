import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getItemFigmaClientStorage } from '../utils/storage';
import { addToFavorite, getFigmaSouceCodeById, removeFromFavorite } from '../services/component';
import PremiumCrownSvgIcon from '../assets/icons/PremiumCrownSvgIcon';
import CopyIconSvg from '../assets/icons/CopyIconSvg';
import FavoriteIconSvg from '../assets/icons/FavoriteIconSvg';
import FilledLikeIconSvg from '../assets/icons/FilledLikeIconSvg';
import DefaultLoading from '../shared/loading/DefaultLoading';

const ComponentCard = ({ card }) => {
  const {
    setActiveLoginDialog,
    activeTab,
    viewMode,
    isSubscribed,
    favoriteIds,
    favoritePagesIds,
    favoriteScreensIds,
    setFavoriteIds,
    setFavoritePagesIds,
    setFavoriteScreensIds,
    setCopiedFigmaDesignMessage,
    setComponentCopiedpopupVisible,
  } = useGlobalContext();
  const [copyLoading, setCopyLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [likeDislikeLoading, setLikeDislikeLoading] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleCopyFigmaCode = async () => {
    setCopyLoading(true);

    const token = await getItemFigmaClientStorage('jsToken');
    if (!token) {
      // alert('Please login first.');
      setActiveLoginDialog(true);
      setCopyLoading(false);
      return;
    }

    if (isSubscribed || card?.license === 'FREE') {
      try {
        const componentSourceCode: any = await getFigmaSouceCodeById(card?.id);
        const htmlContent = componentSourceCode?.data?.figmaCode || '';
        if (!htmlContent) {
          alert('No content to copy.');
          setCopyLoading(false);
          return;
        }

        const copyComponent = (code: string, t = 'application/json') => {
          const n = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.clipboardData && e.clipboardData.setData(t, code);
            window.removeEventListener('copy', n, !0);
          };
          window.addEventListener('copy', n, !0);
          document.execCommand('copy');
        };

        copyComponent(htmlContent, 'text/html');
        setCopiedFigmaDesignMessage('Component copied to clipboard');
        setComponentCopiedpopupVisible(true);
      } catch (error) {
        console.error('Copy failed:', error);
        alert('Failed Something went wrong.');
      }
    } else {
      alert('Please subscribed first.');
    }
    setCopyLoading(false);
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikeDislikeLoading(true);

    // Check if user is logged in
    if (!(await getItemFigmaClientStorage('jsToken'))) {
      setActiveLoginDialog(true);
      setLikeDislikeLoading(false);
      return;
    }

    // change type and logic accoridng to active tab
    let entityType = 'COMPONENT';
    let activeFavoriteList = favoriteIds;
    let setActiveFavoriteList = setFavoriteIds;

    if (activeTab === 1) {
      entityType = 'PAGE';
      activeFavoriteList = favoritePagesIds;
      setActiveFavoriteList = setFavoritePagesIds;
    } else if (activeTab === 2) {
      entityType = 'SCREEN';
      activeFavoriteList = favoriteScreensIds;
      setActiveFavoriteList = setFavoriteScreensIds;
    }

    try {
      if (isLiked) {
        await removeFromFavorite({ entityId: card?.id, entityType });
        setActiveFavoriteList((prev) => prev.filter((fav) => fav.id !== card?.id));
      } else {
        await addToFavorite({ entityId: card?.id, entityType });
        setActiveFavoriteList((prev) => [...prev, { id: card?.id }]);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      // toastError("Error", "Failed to update like status.");
      setIsLiked((prev) => !prev); // Revert the toggle on error
    } finally {
      setTimeout(() => {
        setLikeDislikeLoading(false);
        if (!isLiked) {
          setAnimateLike(true);
        }
      }, 1000); // show loading indicator for 1 sec
    }
  };

  useEffect(() => {
    let activeFavoriteList = favoriteIds;
    if (activeTab === 1) activeFavoriteList = favoritePagesIds;
    if (activeTab === 2) activeFavoriteList = favoriteScreensIds;
    setIsLiked(activeFavoriteList.some((fav) => fav.id === card?.id));
  }, [favoriteIds, favoritePagesIds, favoriteScreensIds, card?.id, activeTab]);

  // Reset animation after it completes
  useEffect(() => {
    if (animateLike) {
      const timer = setTimeout(() => setAnimateLike(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animateLike]);

  // Image Handling based on tab
  let imageUrl = '';

  if (activeTab === 0) {
    imageUrl = card?.documents?.[0]?.url || '';
  } else if (activeTab === 1 || activeTab === 2) {
    imageUrl = card?.thumbnailUrl || '';
  }

  return (
    <div className={`component-card ${viewMode === 'list' ? 'list-layout' : ''}`}>
      <div className={`component-preview ${card.backgroundClass} ${viewMode === 'list' ? 'list-view' : ''}`}>
        {/* card vector  */}
        <div className="component_card_vector">
          <svg width="90" height="85" viewBox="0 0 90 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H90V85L44.1509 39.9057L0 0Z" fill="url(#paint0_linear_9134_19388)" />
            <defs>
              <linearGradient
                id="paint0_linear_9134_19388"
                x1="90"
                y1="0"
                x2="4.30478e-07"
                y2="85"
                gradientUnits="userSpaceOnUse"
              >
                <stop />
                <stop offset="0.475962" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Premium Badge */}
        {card.license === 'PREMIUM' && (
          <div className="premium-badge">
            <PremiumCrownSvgIcon width="27.67px" height="27.67px" />
          </div>
        )}
        <div>
          <img
            src={imageUrl}
            alt={card.title}
            style={{ width: '100%', borderRadius: '9.05px' }}
            // onLoadingComplete={() => setIsImageLoading(false)}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          {isImageLoading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
                borderRadius: '12px',
              }}
            >
              {/* <ImageLoading loading={isImageLoading} /> */}
              <div>
                {isImageLoading && (
                  <div className="dots-loader">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Overlay */}
        <div className="overlay">
          <div className="overlay-icons">
            {/* {!card?.isFavoriteScreen === true && ( */}
            <div
              onClick={(e: any) => {
                !likeDislikeLoading && handleToggleLike(e);
              }}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                cursor: likeDislikeLoading ? 'default' : 'pointer',
              }}
            >
              <div
                className={animateLike ? 'scale-up' : ''}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {likeDislikeLoading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh',
                    }}
                  >
                    <DefaultLoading size="24px" color={!isLiked ? '#E25454' : 'black'} />
                  </div>
                ) : isLiked ? (
                  <FilledLikeIconSvg color="#E25454" />
                ) : (
                  <FavoriteIconSvg color="#0C0C0C" />
                )}
              </div>
            </div>
            {/* )} */}
            <button onClick={handleCopyFigmaCode} title="Copy">
              <CopyIconSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
