import React, { useEffect, useRef } from 'react';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';
import FreeToggle from '../components/FreeToggle';
import ComponentCard from '../components/ComponentCard';
import Header from '../components/Header';
import GridControls from '../components/GridControls';
import { getAllComponents } from '../services/component';
import NoResultUI from '../components/NoResultUI';
import SearchComponent from '../components/SearchComponent';
import { useGlobalContext } from '../context/GlobalContext';
import { getAllPages } from '../services/page';
import { getAllScreens } from '../services/screen';
import DefaultLoading from '../shared/loading/DefaultLoading';

const ROWS_PER_PAGE = 20;

function Home() {
  const {
    resetFilters,
    selectedCollection,
    setSelectedCollection,
    selectedCategory,
    setSelectedCategory,
    showFreeOnly,
    searchQuery,
    collections,
    categories,
    viewMode,
    collectionDropdownOpen,
    setCollectionDropdownOpen,
    categoryDropdownOpen,
    setCategoryDropdownOpen,
    activeTab,
  } = useGlobalContext();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [currentTabDataList, setCurrentTabDataList] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  // for inifity scroll we have to give to exact container in plugin code
  const resultContainerRef: any = useRef();

  const handleReset = () => {
    resetFilters();
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data fetching with filters
  const fetchTabWiseData = async (filters?: any, resetPage = false) => {
    try {
      setIsEmpty(false);
      const apiFunction = getCorrectApiFunction();
      const res: any = await apiFunction(filters);

      // Har tab ke hisab se correct data extract karo
      let extractedData = [];
      let totalCount = 0;

      if (activeTab === 0) {
        extractedData = res.paginatedComponents || [];
        totalCount = res.totalComponents || 0;
      } else if (activeTab === 1) {
        extractedData = res.paginatedPages || [];
        totalCount = res.totalPages || 0;
      } else if (activeTab === 2) {
        extractedData = res.paginatedScreens || [];
        totalCount = res.totalScreens || 0;
      }

      if (resetPage) {
        // setCurrentTabDataList(res);
        setCurrentTabDataList(extractedData);
      } else {
        // setCurrentTabDataList((prevList: any) => ({
        //   paginatedComponents: [...(prevList?.paginatedComponents || []), ...(res?.paginatedComponents || [])],
        // }));
        setCurrentTabDataList((prevList: any) => [...(prevList || []), ...extractedData]);
      }
      setHasMore(totalCount > ROWS_PER_PAGE * filters.page);
      setIsEmpty(extractedData.length === 0);
    } catch (err) {
      console.error('Error fetching filtered components:', err);
    } finally {
      setFetchDataLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const getCorrectApiFunction = () => {
    if (activeTab === 0) return getAllComponents;
    if (activeTab === 1) return getAllPages;
    if (activeTab === 2) return getAllScreens;
  };

  // Load more handler
  const handleLoadMore = () => {
    if (loadMoreLoading) return;
    setLoadMoreLoading(true);
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };

  // Infinite scroll
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore && !fetchDataLoading) {
  //         handleLoadMore();
  //       }
  //     },
  //     // { threshold: 1.0 }
  //     { threshold: 0.1 }
  //   );

  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current);
  //     }
  //   };
  // }, [fetchDataLoading, hasMore]);

  // Manual Infinity scroll call
  useEffect(() => {
    let timeoutId: any;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollTop = resultContainerRef.current.scrollTop;
        const scrollHeight = resultContainerRef.current.scrollHeight;
        const clientHeight = resultContainerRef.current.clientHeight;

        const isNearBottom = scrollTop + clientHeight >= scrollHeight * 0.7;

        if (isNearBottom && hasMore && !fetchDataLoading && !loadMoreLoading) {
          // console.log('Scroll Triggered for Page:', page + 1);
          handleLoadMore();
        }

        clearTimeout(timeoutId);
        timeoutId = null;
      }, 200);
    };

    const container = resultContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasMore, fetchDataLoading, loadMoreLoading]);

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
    fetchTabWiseData(filters);
  }, [page]);

  // get data on every filter change
  useEffect(() => {
    setFetchDataLoading(true);
    setIsEmpty(false);
    const filters = {
      collections: selectedCollection !== 'all' ? [selectedCollection] : [],
      categories: selectedCategory !== 'all' ? [selectedCategory] : [],
      licenses: showFreeOnly == true ? ['Free'] : ['Premium', 'Free'],
      searchBy: searchQuery,
      pageSize: ROWS_PER_PAGE,
      page: 1,
    };
    setPage(1);
    fetchTabWiseData(filters, true);
  }, [selectedCollection, selectedCategory, showFreeOnly, searchQuery, activeTab]);

  const isAnyFilterApplied =
    selectedCollection !== 'all' || selectedCategory !== 'all' || showFreeOnly === true || searchQuery.trim() !== '';

  return (
    <>
      <div className="container">
        <div className="header_main_container">
          {/* Header */}
          <Header />

          {/* Filters and Search */}
          <div className="filters-section">
            <div className="filters-row">
              <Dropdown
                options={collections}
                selectedId={selectedCollection}
                onChange={setSelectedCollection}
                placeholder="Collection"
                isOpen={collectionDropdownOpen}
                setIsOpen={setCollectionDropdownOpen}
                labelKey="name"
                valueKey="_id"
                showImage={true}
                imageKey="logoUrl"
              />

              <Dropdown
                options={categories}
                selectedId={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Category"
                isOpen={categoryDropdownOpen}
                setIsOpen={setCategoryDropdownOpen}
                labelKey="value"
                valueKey="_id"
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
        </div>

        <div className="result_container">
          {/* Component Grid/List */}
          <div ref={resultContainerRef} className="content-section">
            {fetchDataLoading ? (
              <div
                style={{
                  width: '100%',
                  height: '95%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <DefaultLoading size="25" trackColor="#0C0C0C" />
              </div>
            ) : isEmpty ? (
              <NoResultUI />
            ) : (
              <div className={viewMode === 'grid' ? 'components-grid' : 'components-list'}>
                {currentTabDataList?.map((card) => (
                  <ComponentCard key={card.id} card={card} />
                ))}
              </div>
            )}
            {/* Loader reference for infinite scroll */}
            {/* <div
              style={{
                height: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // border:"1px solid green",
              }}
              // ref={loaderRef}
            > */}
            {loadMoreLoading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <DefaultLoading size="20" thickness="2px" trackColor="#0C0C0C" />
              </div>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
