import React, { createContext, useState, useCallback, useEffect, useRef, ReactNode, useContext, useMemo } from 'react';
import { getAllCollections } from '../services/collection';
import { getAllConstantValues } from '../services/constantValues';

interface GlobalContextProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collections: any;
  categories: any;
  selectedCollection: string;
  setSelectedCollection: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  showFreeOnly: boolean;
  setShowFreeOnly: any;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  localSearch: string;
  setLocalSearch: (val: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  hasMore: boolean;
  resetFilters: () => void;
  collectionDropdownOpen: boolean;
  setCollectionDropdownOpen: (val: boolean) => void;
  categoryDropdownOpen: boolean;
  setCategoryDropdownOpen: (val: boolean) => void;
  tabs: any;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const tabs = ['Components', 'Pages', 'Screens'];
  const [currentScreen, setCurrentScreen] = useState('COMPONENT');
  const [activeTab, setActiveTab] = useState('Components');
  const [collections, setCollections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFreeOnly, setShowFreeOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const fetchCollections = useCallback(async (filters?: any) => {
    setLoading(true);

    await getAllCollections(filters)
      .then((res: any) => {
        // Sort collections in descending order based on createdAt
        const sortedCollections = res?.paginatedCollections.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setCollections(sortedCollections);
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
        setCategories(sortedCategories);
      })
      .catch(() => console.log('err'))
      .finally(() => setLoading(false));
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setLocalSearch('');
    setSelectedCollection('all');
    setSelectedCategory('all');
    setShowFreeOnly(false);
  };

  useEffect(() => {
    fetchCollections({ type: currentScreen });
    fetchCategories({ type: `${currentScreen}_CATEGORY` });
  }, [currentScreen]);

  const globalContextProps = useMemo(
    () => ({
      currentScreen,
      setCurrentScreen,
      activeTab,
      setActiveTab,
      collections,
      categories,
      selectedCollection,
      setSelectedCollection,
      selectedCategory,
      setSelectedCategory,
      showFreeOnly,
      setShowFreeOnly,
      searchQuery,
      setSearchQuery,
      localSearch,
      setLocalSearch,
      viewMode,
      setViewMode,
      loading,
      setLoading,
      hasMore,
      resetFilters,
      collectionDropdownOpen,
      setCollectionDropdownOpen,
      categoryDropdownOpen,
      setCategoryDropdownOpen,
      tabs,
    }),
    [
      currentScreen,
      setCurrentScreen,
      activeTab,
      setActiveTab,
      collections,
      categories,
      selectedCollection,
      setSelectedCollection,
      selectedCategory,
      setSelectedCategory,
      showFreeOnly,
      setShowFreeOnly,
      searchQuery,
      setSearchQuery,
      localSearch,
      setLocalSearch,
      viewMode,
      setViewMode,
      loading,
      setLoading,
      hasMore,
      resetFilters,
      collectionDropdownOpen,
      setCollectionDropdownOpen,
      categoryDropdownOpen,
      setCategoryDropdownOpen,
      tabs,
    ]
  );

  return <GlobalContext.Provider value={globalContextProps}>{children}</GlobalContext.Provider>;
};
