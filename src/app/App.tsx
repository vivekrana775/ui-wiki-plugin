import React, { useEffect } from 'react';
import './styles/ui.css';
import './styles/styles.css';
import { useState } from 'react';
import { useGlobalContext } from './context/GlobalContext';
import FigmaDesignCopySuccessPopup from './components/FigmaDesignCopySuccessPopup';
import LoginDialog from './components/LoginDialog';
import Home from './pages/Home';
import SettingsPage from './pages/SettingsPage';

function App() {
  const {
    componentCopiedpopupVisible,
    setComponentCopiedpopupVisible,
    copiedFigmaDesignMessage,
    activeLoginDialog,
    setActiveLoginDialog,
    currentPage,
  } = useGlobalContext();

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return <Home />;
      case 'SETTINGS':
        return <SettingsPage />;
      default:
        return <Home />;
    }
  };
  useEffect(() => {
    renderPage()
  }, [currentPage]);
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>{renderPage()}</div>

      {/* All Popups  */}
      <div>
        {activeLoginDialog && (
          <LoginDialog activeDialog={activeLoginDialog} handleDialog={() => setActiveLoginDialog(false)} />
        )}
        {componentCopiedpopupVisible && (
          <FigmaDesignCopySuccessPopup
            message={copiedFigmaDesignMessage || 'copied to clipboard'}
            subtitle={`Paste (CTRL + V) this ${copiedFigmaDesignMessage.replace(
              'copied to clipboard',
              ''
            )} in your Figma file`}
            onClose={() => setComponentCopiedpopupVisible(false)}
          />
        )}
        {/* Add more dialogs similarly here */}
      </div>
    </>
  );
}

export default App;
