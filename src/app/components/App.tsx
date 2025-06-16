import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';
import '../styles/styles.css';

import { useState, useMemo } from 'react';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFreeOnly, setShowFreeOnly] = useState(true);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const collections = [
    { value: 'all', label: 'All Collections' },
    { value: 'countdown', label: 'Countdown Timers' },
    { value: 'forms', label: 'Forms' },
    { value: 'cards', label: 'Cards' },
    { value: 'navigation', label: 'Navigation' },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'ui', label: 'UI Components' },
    { value: 'layout', label: 'Layout' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'display', label: 'Display' },
  ];

  const componentCards = [
    {
      id: 1,
      title: "Sana's exclusive live session coming soon",
      collection: 'countdown',
      category: 'interactive',
      isFree: true,
      countdown: { days: '01', hours: '23', minutes: '45' },
      backgroundClass: 'bg-purple-blue',
      accentClass: 'accent-purple-blue',
      tags: ['countdown', 'timer', 'event'],
    },
    {
      id: 2,
      title: "Sana's exclusive live session coming soon",
      collection: 'countdown',
      category: 'interactive',
      isFree: true,
      countdown: { days: '01', hours: '23', minutes: '45' },
      backgroundClass: 'bg-orange-pink',
      accentClass: 'accent-orange-pink',
      tags: ['countdown', 'timer', 'colorful'],
    },
    {
      id: 3,
      title: 'Live sessions coming soon',
      collection: 'countdown',
      category: 'interactive',
      isFree: false,
      countdown: { days: '01', hours: '23', minutes: '45', seconds: '21' },
      backgroundClass: 'bg-amber-orange',
      accentClass: 'accent-amber-orange',
      tags: ['countdown', 'premium', 'detailed'],
    },
    {
      id: 4,
      title: 'Live sessions coming soon',
      collection: 'countdown',
      category: 'display',
      isFree: true,
      countdown: { days: '01', hours: '23' },
      backgroundClass: 'bg-rose-orange',
      accentClass: 'accent-rose-orange',
      tags: ['countdown', 'simple', 'minimal'],
    },
    {
      id: 5,
      title: "Sana's exclusive live session coming soon",
      collection: 'countdown',
      category: 'ui',
      isFree: true,
      countdown: { days: '01', hours: '23', minutes: '45' },
      backgroundClass: 'bg-green-teal',
      accentClass: 'accent-green-teal',
      tags: ['countdown', 'nature', 'calm'],
    },
    {
      id: 6,
      title: 'Join Sana family and elevate your path',
      collection: 'forms',
      category: 'layout',
      isFree: false,
      countdown: { days: '01', hours: '23', minutes: '45' },
      backgroundClass: 'bg-slate-stone',
      accentClass: 'accent-slate-stone',
      tags: ['form', 'signup', 'community'],
    },
  ];

  const filteredComponents = useMemo(() => {
    return componentCards.filter((component) => {
      const matchesSearch =
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCollection = selectedCollection === 'all' || component.collection === selectedCollection;
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      const matchesFree = !showFreeOnly || component.isFree;

      return matchesSearch && matchesCollection && matchesCategory && matchesFree;
    });
  }, [searchQuery, selectedCollection, selectedCategory, showFreeOnly, componentCards]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCollection('all');
    setSelectedCategory('all');
    setShowFreeOnly(false);
  };

  const CustomDropdown = ({
    options,
    value,
    onChange,
    placeholder,
    isOpen,
    setIsOpen,
  }: {
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }) => (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger">
        <span>{options.find((opt) => opt.value === value)?.label || placeholder}</span>
        <svg className={`dropdown-arrow ${isOpen ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="dropdown-item"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="title">Flowbase Component Library</h1>
          </div>
          <button className="close-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="nav-section">
          <div className="nav-tabs">
            <button className="nav-tab active">Components</button>
            <button className="nav-tab">Elements</button>
          </div>
          <div className="user-avatar">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="filters-row">
          <CustomDropdown
            options={collections}
            value={selectedCollection}
            onChange={setSelectedCollection}
            placeholder="Collection"
            isOpen={collectionDropdownOpen}
            setIsOpen={setCollectionDropdownOpen}
          />

          <CustomDropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Category"
            isOpen={categoryDropdownOpen}
            setIsOpen={setCategoryDropdownOpen}
          />

          <button
            onClick={() => setShowFreeOnly(!showFreeOnly)}
            className={`free-toggle ${showFreeOnly ? 'active' : ''}`}
          >
            Free {showFreeOnly && '✓'}
          </button>

          <div className="results-count">
            {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <div className="search-row">
          <div className="search-container">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search components, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button onClick={resetFilters} className="reset-btn">
            Reset
          </button>

          <div className="view-controls">
            <button onClick={() => setViewMode('list')} className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button onClick={() => setViewMode('grid')} className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Component Grid/List */}
      <div className="content-section">
        {filteredComponents.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012-2z"
              />
            </svg>
            <h3 className="empty-title">No components found</h3>
            <p className="empty-description">Try adjusting your search or filter criteria</p>
            <button onClick={resetFilters} className="empty-action">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'components-grid' : 'components-list'}>
            {filteredComponents.map((card) => (
              <div key={card.id} className={`component-card ${viewMode === 'list' ? 'list-layout' : ''}`}>
                <div className={`component-preview ${card.backgroundClass} ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {/* Download Icon */}
                  <button className="download-btn">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>

                  {/* Premium Badge */}
                  {!card.isFree && <div className="premium-badge">PRO</div>}

                  {/* Content */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      textAlign: 'center',
                      gap: viewMode === 'list' ? '0.5rem' : '1rem',
                    }}
                  >
                    {viewMode === 'grid' && <h3 className="component-title">{card.title}</h3>}

                    {/* Countdown */}
                    <div className="countdown-container" style={{ gap: viewMode === 'list' ? '0.5rem' : '0.75rem' }}>
                      <div className="countdown-item">
                        <div
                          className="countdown-number"
                          style={{ fontSize: viewMode === 'list' ? '1rem' : '1.25rem' }}
                        >
                          {card.countdown.days}
                        </div>
                        <div className="countdown-label">Days</div>
                      </div>
                      <div className="countdown-item">
                        <div
                          className="countdown-number"
                          style={{ fontSize: viewMode === 'list' ? '1rem' : '1.25rem' }}
                        >
                          {card.countdown.hours}
                        </div>
                        <div className="countdown-label">Hrs</div>
                      </div>
                      <div className="countdown-item">
                        <div
                          className="countdown-number"
                          style={{ fontSize: viewMode === 'list' ? '1rem' : '1.25rem' }}
                        >
                          {card.countdown.minutes}
                        </div>
                        <div className="countdown-label">Min</div>
                      </div>
                      {card.countdown.seconds && (
                        <div className="countdown-item">
                          <div
                            className="countdown-number"
                            style={{ fontSize: viewMode === 'list' ? '1rem' : '1.25rem' }}
                          >
                            {card.countdown.seconds}
                          </div>
                          <div className="countdown-label">Sec</div>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`cta-button ${card.accentClass}`}
                      style={{
                        fontSize: viewMode === 'list' ? '0.75rem' : '0.875rem',
                        padding: viewMode === 'list' ? '0.25rem 0.75rem' : '0.5rem 1rem',
                      }}
                    >
                      Join us
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="decorative-elements">
                    <div className="leaf-left"></div>
                    <div className="leaf-right"></div>
                  </div>
                </div>

                {/* List View Content */}
                {viewMode === 'list' && (
                  <div className="list-content">
                    <h3 className="list-title">{card.title}</h3>
                    <div className="tags-container">
                      {card.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="list-meta">
                      <span className="category-label">{card.category}</span>
                      <span className={`price-label ${card.isFree ? 'free' : 'premium'}`}>
                        {card.isFree ? 'Free' : 'Premium'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
