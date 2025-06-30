import React, { useRef, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getItemFigmaClientStorage } from '../utils/storage';
import { getFigmaSouceCodeById } from '../services/component';
import PremiumCrownSvgIcon from '../assets/icons/PremiumCrownSvgIcon';
import CopyIconSvg from '../assets/icons/CopyIconSvg';
import FavoriteIconSvg from '../assets/icons/FavoriteIconSvg';

const ComponentCard = ({ card }) => {
  const { setActiveLoginDialog, viewMode, isSubscribed, setCopiedFigmaDesignMessage, setComponentCopiedpopupVisible } =
    useGlobalContext();
  const [copyLoading, setCopyLoading] = useState<boolean>(false);

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
      setCopiedFigmaDesignMessage('Component copied to clipboard');
      setComponentCopiedpopupVisible(true);
      return;
      try {
        const componentSourceCode: any = await getFigmaSouceCodeById(card?.id);
        const htmlContent = componentSourceCode?.data?.figmaCode || '';

        if (!htmlContent) {
          alert('No content to copy.');
          setCopyLoading(false);
          return;
        }
        // Create a Blob with the HTML content and specify the MIME type as 'text/html'
        // const blob = new Blob([htmlContent], { type: 'text/html' });
        // const clipboardItem = new ClipboardItem({ 'text/html': blob });
        // Copy the Blob to the clipboard
        // navigator.clipboard
        //   .write([clipboardItem])
        //   .then(() => {
        //     console.log('5');
        //     alert('component Copied success');
        //   })
        //   .catch((err) => {
        //     console.log('6');
        //     alert('Unable to copy component');
        //   });

        // console.log("clipboardItem",clipboardItem)
        //  Message bhejna main thread ko ke copy karna hai
        window.parent.postMessage({ pluginMessage: { type: 'copy-to-clipboard', content: htmlContent } }, '*');

        // Success notification bhejna
        // window.parent.postMessage(
        //   { pluginMessage: { type: 'show-notification', content: 'Component copied successfully!' } },
        //   '*'
        // );
      } catch (error) {
        console.log('7');
        console.error('Copy failed:', error);
        alert('Failed Something went wrong.');
      }
    } else {
      console.log('8');
      alert('Please subscribed first.');
    }
    console.log('9');
    setCopyLoading(false);
  };

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
          <img src={card?.documents[0]?.url} alt={card.title} style={{ width: '100%', borderRadius: '9.05px' }} />
        </div>

        {/* Overlay */}
        <div className="overlay">
          <div className="overlay-icons">
            <button title="Favourite">
              <FavoriteIconSvg color='#0C0C0C'/>
            </button>
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
