import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getItemFigmaClientStorage } from '../utils/storage';
import { getFigmaSouceCodeById } from '../services/component';

const ComponentCard = ({ card }) => {
  const { viewMode, isSubscribed } = useGlobalContext();
  const [copyLoading, setCopyLoading] = useState<boolean>(false);

  const handleCopyFigmaCode = async () => {
    setCopyLoading(true);

    // const token = await getItemFigmaClientStorage('jsToken');
    // if (!token) {
    //   alert('Please login first.');
    //   setCopyLoading(false);
    //   return;
    // }

    if (isSubscribed || card?.license === 'FREE') {
      try {
        console.log('1');
        const componentSourceCode: any = await getFigmaSouceCodeById(card?.id);
        const htmlContent = componentSourceCode?.data?.figmaCode || '';
        console.log('2');

        if (!htmlContent) {
          console.log('3');
          alert('No content to copy.');
          setCopyLoading(false);
          return;
        }
        console.log('4');
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
        {/* copy icon  */}
        <div onClick={handleCopyFigmaCode} className="copy_icon">
          <span>Copy</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="white" opacity="0.01" />
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              fill="white"
            />
          </svg>
        </div>

        {/* Premium Badge */}
        {card.license === 'PREMIUM' && (
          <div className="premium-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6L7 12L12 6L17 12L22 6V20H2V6Z" fill="white" />
              <path d="M4 18H20V8.83L17 12L12 6L7 12L4 8.83V18Z" fill="none" />
            </svg>
          </div>
        )}
        <div>
          <img src={card?.documents[0]?.url} alt={card.title} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
