import React, { useCallback, useEffect, useRef } from 'react';
import logo from '../assets/logo.svg';
import Dropdown from './components/Dropdown';
import './styles/ui.css';
import './styles/styles.css';

import { useState, useMemo } from 'react';
import FreeToggle from './components/FreeToggle';
import ComponentCard from './components/ComponentCard';
import Header from './components/Header';
import GridControls from './components/GridControls';
import { getAllCollections } from './services/collection';
import { getAllConstantValues } from './services/constantValues';
import { getAllComponents } from './services/component';
import NoResultUI from './components/NoResultUI';
import SearchComponent from './components/SearchComponent';

const ROWS_PER_PAGE = 20;

function App() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('Components');
  const tabs = ['Components', 'Pages', 'Screens'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [collectionsList, setCollectionsList] = useState<any>([]);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [currentScreen, setCurrentScreen] = useState<any>('COMPONENT');
  const [componentsData, setComponentsData] = useState<{ paginatedComponents: any[] }>({ paginatedComponents: [] });

  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchCollections = useCallback(async (filters?: any) => {
    setLoading(true);

    await getAllCollections(filters)
      .then((res: any) => {
        // Sort collections in descending order based on createdAt
        const sortedCollections = res?.paginatedCollections.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setCollectionsList(sortedCollections);
      })
      .catch((err) => {
        console.log('err');
      })
      .finally(() => setLoading(false));
  }, []);
  
  const fetchCategories = useCallback(async (filters?: any) => {
    setLoading(true);
    await getAllConstantValues(filters)
      .then((res: any) => {
        // Sort categories alphabetically by the 'value' property
        const sortedCategories = res?.paginatedConstantValues.sort((a: any, b: any) => {
          return a.value.localeCompare(b.value);
        });
        setCategoriesList(sortedCategories);
      })
      .catch(() => console.log('err'))
      .finally(() => setLoading(false));
  }, []);

  // Data fetching with filters
  const getComponents = async (filters?: any, resetPage = false) => {
    // setLoading(true);
    try {
      const res: any = await getAllComponents(filters);
      if (resetPage || page === 1) {
        setComponentsData(res);
      } else {
        setComponentsData((prevList: any) => ({
          paginatedComponents: [...(prevList?.paginatedComponents || []), ...(res?.paginatedComponents || [])],
        }));
      }
      setHasMore(res.totalComponents > ROWS_PER_PAGE * page);
    } catch (err) {
      console.error('Error fetching filtered components:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load more handler
  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      return newPage;
    });
  };

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          handleLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    fetchCollections({ type: currentScreen });
    fetchCategories({ type: `${currentScreen}_CATEGORY` });
  }, [currentScreen]);

  useEffect(() => {
    const filters = {
      page: page,
      pageSize: ROWS_PER_PAGE,
    };
    getComponents(filters);
  }, [page]);

  useEffect(() => {
    const filters = {
      pageSize: ROWS_PER_PAGE,
      searchBy: searchQuery,
      page,
    };
    getComponents(filters, true);
  }, []);

  // console.log('componentsData', componentsData);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCollection('all');
    setSelectedCategory('all');
    setShowFreeOnly(false);
  };
  return (
    <div className="container">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="filters-row">
          <Dropdown
            options={collectionsList}
            value={selectedCollection}
            onChange={setSelectedCollection}
            placeholder="Collection"
            isOpen={collectionDropdownOpen}
            setIsOpen={setCollectionDropdownOpen}
          />

          <Dropdown
            options={categoriesList}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Category"
            isOpen={categoryDropdownOpen}
            setIsOpen={setCategoryDropdownOpen}
          />
          <FreeToggle isOn={showFreeOnly} setShowFreeOnly={setShowFreeOnly} />
        </div>

        <div className="search-row">
          <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <button onClick={resetFilters} className="reset-btn">
            Reset
          </button>

          <GridControls viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      <div className="result_container">
        {/* Component Grid/List */}
        <div className="content-section">
          {loading ? (
            <div> Loading...</div>
          ) : componentsData?.paginatedComponents.length === 0 ? (
            <NoResultUI resetFilters={resetFilters} />
          ) : (
            <div className={viewMode === 'grid' ? 'components-grid' : 'components-list'}>
              {componentsData?.paginatedComponents.map((card) => (
                <ComponentCard key={card.id} card={card} viewMode={viewMode} />
              ))}
            </div>
          )}
          {/* Loader reference for infinite scroll */}
          <div
            style={{
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            ref={loaderRef}
          >
            {loadMoreLoading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <h2>Loading...</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
