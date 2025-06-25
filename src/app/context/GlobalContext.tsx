import React, { createContext, useState, useCallback, useEffect, useRef, ReactNode, useContext, useMemo } from 'react';
import { getAllCollections } from '../services/collection';
import { getAllConstantValues } from '../services/constantValues';
import { loginUserByToken } from '../services/authentication';
import { getItemFigmaClientStorage, removeItemFigmaClientStorage, setItemFigmaClientStorage } from '../utils/storage';
import { getUserById } from '../services/user';

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
  isSubscribed: boolean;
  setIsSubscribed: any;
  userSubscriptions: any;
  setUserSubscriptions: any;
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
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>('');
  const [userSubscriptions, setUserSubscriptions] = useState<any>([]);

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

  const getUserSubscriptionsDetails = async (id: string) => {
    const response = await getUserById(id);
    const subscriptions = response?.data?.subscriptions;

    if (subscriptions?.length > 0) {
      setUserSubscriptions(subscriptions);
      for (let subscription of subscriptions) {
        if (subscription.status !== 'INACTIVE') {
          setIsSubscribed(true);
        }
      }
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setLocalSearch('');
    setSelectedCollection('all');
    setSelectedCategory('all');
    setShowFreeOnly(false);
  };

  useEffect(() => {
    if (userDetails) {
      getUserSubscriptionsDetails(userDetails._id);
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchUserDetails = async (token: string) => {
      await loginUserByToken({ token })
        .then((res) => {
          setItemFigmaClientStorage('jsToken', res?.data?.token);
          setItemFigmaClientStorage('user', JSON.stringify(res?.data));
          setItemFigmaClientStorage('userId', JSON.stringify(res?.data?._id));
          setUserDetails(res?.data?.user);
        })
        .catch((err) => {
          console.log('err', 'err in logging user by token');
        });
    };

    const userToken: any = getItemFigmaClientStorage('jsToken');
    if (userToken) {
      fetchUserDetails(userToken);
    } else {
      removeItemFigmaClientStorage('jsToken');
    }
  }, []);

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
      isSubscribed,
      setIsSubscribed,
      userSubscriptions,
      setUserSubscriptions,
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
      isSubscribed,
      setIsSubscribed,
      userSubscriptions,
      setUserSubscriptions,
    ]
  );

  return <GlobalContext.Provider value={globalContextProps}>{children}</GlobalContext.Provider>;
};
