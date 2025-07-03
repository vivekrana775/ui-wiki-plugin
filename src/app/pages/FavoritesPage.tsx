import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import { getUserFavorites } from '../services/component';
import ComponentCard from '../components/ComponentCard';
import DefaultLoading from '../shared/loading/DefaultLoading';
import FavoritePageNoResultUI from '../components/FavoritePageNoResultUI';

const FavoritesPage = () => {
  const { tabs, setCurrentPage, activeTab, setActiveTab } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteComponents, setFavoriteComponents] = useState<any>([]);
  const [favoritePages, setFavoritePages] = useState<any>([]);
  const [favoriteScreens, setFavoriteScreens] = useState<any>([]);
  const [currentTabDataList, setCurrentTabDataList] = useState<any[]>([]);

  const fetchUserFavorites = async () => {
    try {
      const res: any = await getUserFavorites();

      if (res?.data?.favoriteComponents) {
        setFavoriteComponents(res?.data?.favoriteComponents);
        setFavoritePages(res?.data?.favoritePages);
        setFavoriteScreens(res?.data?.favoriteScreens);
      }
    } catch (err) {
      console.log('Error fetching components:', err);
    } finally {
      setLoading(false);
      setActiveTab(0);
    }
  };

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  // Whenever tab changes, update the list
  useEffect(() => {
    if (loading) return;

    if (activeTab === 0) setCurrentTabDataList(favoriteComponents);
    if (activeTab === 1) setCurrentTabDataList(favoritePages);
    if (activeTab === 2) setCurrentTabDataList(favoriteScreens);
  }, [activeTab, favoriteComponents, favoritePages, favoriteScreens, loading]);

  return (
    <div className="favorite_container">
      <div className="favorite_head">
        <span
          onClick={() => {
            setCurrentPage('SETTINGS');
          }}
          className="favorite_head_icon"
        >
          <LeftArrowIcon />
        </span>
        <span className="favorite_head_title">Favorites</span>
      </div>
      <div className="favorite_tab_container">
        <div className="favorite_tabs">
          <ul className="favorite_nav_tabs">
            {tabs.map((tab) => (
              <li
                key={tab.value}
                className={`favorite_nav_tab ${activeTab === tab.value ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {activeTab === tab.value ? tab.activeIcon : tab.icon}
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ width: '100%', height: '82%' }}>
        <div className="favorite_result_container">
          <div className="content-section">
            {loading ? (
              <div
                style={{
                  width: '100%',
                  height: '95%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <DefaultLoading size='25' trackColor="#0C0C0C" />
              </div>
            ) : currentTabDataList?.length === 0 ? (
              <FavoritePageNoResultUI/>
            ) : (
              <div className="components-grid">
                {currentTabDataList?.map((card) => (
                  <ComponentCard key={card.id} card={card} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
