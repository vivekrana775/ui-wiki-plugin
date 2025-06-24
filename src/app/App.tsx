import React, { useEffect, useRef } from 'react';
import Dropdown from './components/Dropdown';
import './styles/ui.css';
import './styles/styles.css';

import { useState } from 'react';
import FreeToggle from './components/FreeToggle';
import ComponentCard from './components/ComponentCard';
import Header from './components/Header';
import GridControls from './components/GridControls';
import { getAllComponents } from './services/component';
import NoResultUI from './components/NoResultUI';
import SearchComponent from './components/SearchComponent';
import { useGlobalContext } from './context/GlobalContext';

const ROWS_PER_PAGE = 20;

function App() {
  const {
    resetFilters,
    selectedCollection,
    setSelectedCollection,
    selectedCategory,
    setSelectedCategory,
    loading,
    setLoading,
    showFreeOnly,
    searchQuery,
    collections,
    categories,
    viewMode,
    collectionDropdownOpen,
    setCollectionDropdownOpen,
    categoryDropdownOpen,
    setCategoryDropdownOpen,
  } = useGlobalContext();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [componentsData, setComponentsData] = useState<{ paginatedComponents: any[] }>({ paginatedComponents: [] });

  const loaderRef = useRef<HTMLDivElement>(null);

  // Data fetching with filters
  const getComponents = async (filters?: any, resetPage = false) => {
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
      setLoadMoreLoading(false);
    }
  };

  // Load more handler
  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setPage((prevPage) => {
      return prevPage + 1;
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

  // Infinity api call on page change
  useEffect(() => {
    if (page === 1) return;

    const filters = {
      collections: selectedCollection !== 'all' ? [selectedCollection] : [],
      categories: selectedCategory !== 'all' ? [selectedCategory] : [],
      licenses: showFreeOnly == true ? ['Free'] : ['Premium', 'Free'],
      searchBy: searchQuery,
      pageSize: ROWS_PER_PAGE,
      page,
    };
    getComponents(filters);
  }, [page]);

  // get data on every filter change
  useEffect(() => {
    setPage(1);
    const filters = {
      collections: selectedCollection !== 'all' ? [selectedCollection] : [],
      categories: selectedCategory !== 'all' ? [selectedCategory] : [],
      licenses: showFreeOnly == true ? ['Free'] : ['Premium', 'Free'],
      searchBy: searchQuery,
      pageSize: ROWS_PER_PAGE,
      page,
    };
    getComponents(filters, true);
  }, [selectedCollection, selectedCategory, showFreeOnly, searchQuery]);

  const handleReset = () => {
    resetFilters();
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAnyFilterApplied =
    selectedCollection !== 'all' || selectedCategory !== 'all' || showFreeOnly === true || searchQuery.trim() !== '';

  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="filters-row">
          <Dropdown
            options={collections}
            value={selectedCollection}
            onChange={setSelectedCollection}
            placeholder="Collection"
            isOpen={collectionDropdownOpen}
            setIsOpen={setCollectionDropdownOpen}
            labelKey="name"
            valueKey="name"
            showImage={true}
            imageKey="logoUrl"
          />

          <Dropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Category"
            isOpen={categoryDropdownOpen}
            setIsOpen={setCategoryDropdownOpen}
            labelKey="value"
            valueKey="value"
          />
          <FreeToggle />
        </div>

        <div className="search-row">
          <SearchComponent />

          <button
            onClick={handleReset}
            className={`reset-btn ${!isAnyFilterApplied ? 'disabled' : ''}`}
            disabled={!isAnyFilterApplied}
          >
            Reset
          </button>

          <GridControls />
        </div>
      </div>

      <div className="result_container">
        {/* Component Grid/List */}
        <div className="content-section">
          {loading ? (
            <div> Loading...</div>
          ) : componentsData?.paginatedComponents.length === 0 ? (
            <NoResultUI />
          ) : (
            <div className={viewMode === 'grid' ? 'components-grid' : 'components-list'}>
              {componentsData?.paginatedComponents.map((card) => (
                <ComponentCard key={card.id} card={card} />
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
