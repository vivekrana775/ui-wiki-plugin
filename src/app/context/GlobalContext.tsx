import React, { createContext, useState, useCallback, useEffect, useRef, ReactNode, useContext, useMemo } from 'react';
import { getAllCollections } from '../services/collection';
import { getAllConstantValues } from '../services/constantValues';
import { loginUserByToken } from '../services/authentication';
import { getItemFigmaClientStorage, removeItemFigmaClientStorage, setItemFigmaClientStorage } from '../utils/storage';
import { getUserById } from '../services/user';
import ComponentIcon from '../assets/icons/ComponentIcon';
import PagesSvgIcon from '../assets/icons/PagesSvgIcon';
import ScreensSvgIcon from '../assets/icons/ScreensSvgIcon';

interface GlobalContextProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  collections: any[];
  categories: any[];
  selectedCollection: string;
  setSelectedCollection: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  showFreeOnly: boolean;
  setShowFreeOnly: (val: boolean) => void;
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
  tabs: any[];
  isSubscribed: boolean;
  setIsSubscribed: (val: boolean) => void;
  userSubscriptions: any[];
  setUserSubscriptions: (val: any[]) => void;
  componentCopiedpopupVisible: boolean;
  setComponentCopiedpopupVisible: (val: boolean) => void;
  copiedFigmaDesignMessage: string;
  setCopiedFigmaDesignMessage: (val: string) => void;
  activeLoginDialog: boolean;
  setActiveLoginDialog: (val: boolean) => void;
  userDetails: any;
  setUserDetails: (val: any) => void;
  currentPage: string;
  setCurrentPage: (val: string) => void;
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
  // Tab configuration
  const tabs = useMemo(
    () => [
      {
        label: 'Components',
        icon: <ComponentIcon color={'#8B8B8B'} />,
        activeIcon: <ComponentIcon color={'#0C0C0C'} />,
        value: 0,
      },
      {
        label: 'Pages',
        icon: <PagesSvgIcon color={'#8B8B8B'} />,
        activeIcon: <PagesSvgIcon color={'#0C0C0C'} />,
        value: 1,
      },
      {
        label: 'Screens',
        icon: <ScreensSvgIcon color={'#8B8B8B'} />,
        activeIcon: <ScreensSvgIcon color={'#0C0C0C'} />,
        value: 2,
      },
    ],
    []
  );
  const [initialized, setInitialized] = useState(false);
  const [activeLoginDialog, setActiveLoginDialog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState('HOME');
  const [currentScreen, setCurrentScreen] = useState('COMPONENT');
  const [activeTab, setActiveTab] = useState<number>(0);
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
  // State to manage the visibility of the copy success popup
  const [copiedFigmaDesignMessage, setCopiedFigmaDesignMessage] = useState<any>('');
  const [componentCopiedpopupVisible, setComponentCopiedpopupVisible] = useState(false);

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
    const initializeUser = async () => {
      const userToken = await getItemFigmaClientStorage('jsToken');
      if (userToken) {
        try {
          const res = await loginUserByToken({ token: userToken });
          setItemFigmaClientStorage('jsToken', res?.data?.token);
          setItemFigmaClientStorage('user', JSON.stringify(res?.data));
          setItemFigmaClientStorage('userId', JSON.stringify(res?.data?._id));
          setUserDetails(res?.data?.user);
        } catch (err) {
          console.log('Error in logging user by token', err);
          // Clear invalid token
          await removeItemFigmaClientStorage('jsToken');
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    if (!initialized) {
      const loadPersistedData = async () => {
        const savedUser = await getItemFigmaClientStorage('user');
        if (savedUser) {
          setUserDetails(JSON.parse(savedUser));
        }
        setInitialized(true);
      };
      loadPersistedData();
    }
  }, [initialized]);

  useEffect(() => {
    fetchCollections({ type: currentScreen });
    fetchCategories({ type: `${currentScreen}_CATEGORY` });
  }, [currentScreen, fetchCollections, fetchCategories]);

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
      componentCopiedpopupVisible,
      setComponentCopiedpopupVisible,
      copiedFigmaDesignMessage,
      setCopiedFigmaDesignMessage,
      activeLoginDialog,
      setActiveLoginDialog,
      userDetails,
      setUserDetails,
      currentPage,
      setCurrentPage,
    }),
    [
      currentScreen,
      activeTab,
      collections,
      categories,
      selectedCollection,
      selectedCategory,
      showFreeOnly,
      searchQuery,
      localSearch,
      viewMode,
      loading,
      hasMore,
      collectionDropdownOpen,
      categoryDropdownOpen,
      tabs,
      isSubscribed,
      userSubscriptions,
      componentCopiedpopupVisible,
      copiedFigmaDesignMessage,
      activeLoginDialog,
      userDetails,
      currentPage,
    ]
  );

  return <GlobalContext.Provider value={globalContextProps}>{children}</GlobalContext.Provider>;
};
