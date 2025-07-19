import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Clock,
  TrendingUp,
  User,
  Stethoscope,
  Building,
  X,
  HeartPulse,
  Baby,
  BrainCircuit,
  FlaskConical,
  Video,
  Eye,
  Ear
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import api from '../../configs/api';

interface SearchResult {
  id: string;
  type: 'doctor' | 'department' | 'service' | 'community';
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  url: string;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: Date;
  type: string;
}

interface PredefinedSearchItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  query: string;
}

const predefinedSearches = [
  {
    categoryTitle: 'Top Specialties',
    categoryIcon: Stethoscope,
    items: [
      { title: 'Cardiology', subtitle: 'Heart and blood vessel specialists', icon: HeartPulse, query: 'Cardiology' },
      { title: 'Dermatology', subtitle: 'Skin, hair, and nail conditions', icon: User, query: 'Dermatology' },
      { title: 'Pediatrics', subtitle: 'Child healthcare experts', icon: Baby, query: 'Pediatrics' },
      { title: 'Neurology', subtitle: 'Brain, spine, and nerve disorders', icon: BrainCircuit, query: 'Neurology' },
      { title: 'Ophthalmology', subtitle: 'Eye care and vision specialists', icon: Eye, query: 'Ophthalmology' },
      { title: 'Gastroenterology', subtitle: 'Digestive system and gut health', icon: Stethoscope, query: 'Gastroenterology' },
      { title: 'Orthopaedics', subtitle: 'Bone, joint, and muscle issues', icon: Stethoscope, query: 'Orthopaedics' },
      { title: 'ENT', subtitle: 'Ear, Nose, and Throat specialists', icon: Ear, query: 'ENT' },
    ],
  },
  {
    categoryTitle: 'Popular Services',
    categoryIcon: Building,
    items: [
      { title: 'Online Consultation', subtitle: 'Video call with a doctor now', icon: Video, query: 'Online Consultation' },
      { title: 'Book a Lab Test', subtitle: 'At-home sample collection', icon: FlaskConical, query: 'Lab Test' },
      { title: 'Emergency Care', subtitle: 'Find 24/7 emergency rooms', icon: Building, query: 'Emergency' },
    ],
  },
];


const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  className = ""
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockResults: SearchResult[] = [
    // --- Existing & Cardiology ---
    { id: '1', type: 'doctor', title: 'Dr. Rajesh Kumar', subtitle: 'Cardiologist • 15 years experience', icon: Stethoscope, url: '/doctors/rajesh-kumar' },
    { id: '2', type: 'department', title: 'Cardiology Department', subtitle: 'Heart care and cardiac surgery', icon: Building, url: '/departments/cardiology' },
    { id: '5', type: 'community', title: 'Heart Disease Support Group', subtitle: 'Connect with cardiology patients', icon: User, url: '/community/cardiology' },

    // --- Dermatology ---
    { id: '6', type: 'department', title: 'Dermatology Clinic', subtitle: 'Expert care for skin and hair', icon: Building, url: '/departments/dermatology' },
    { id: '13', type: 'doctor', title: 'Dr. Anjali Sharma', subtitle: 'Dermatologist & Cosmetologist', icon: Stethoscope, url: '/doctors/anjali-sharma' },
    { id: '14', type: 'service', title: 'Acne Treatment Program', subtitle: 'Specialized dermatology service', icon: User, url: '/services/acne-treatment' },

    // --- Pediatrics ---
    { id: '15', type: 'department', title: 'Pediatrics Wing', subtitle: 'Complete care for children', icon: Building, url: '/departments/pediatrics' },
    { id: '16', type: 'doctor', title: 'Dr. Mohan Das', subtitle: 'Pediatrician • 12 years experience', icon: Stethoscope, url: '/doctors/mohan-das' },
    { id: '17', type: 'service', title: 'Childhood Vaccinations', subtitle: 'Pediatric immunization schedule', icon: Baby, url: '/services/vaccinations' },

    // --- Neurology ---
    { id: '18', type: 'department', title: 'Neurology & Neurosurgery', subtitle: 'Advanced brain and spine care', icon: Building, url: '/departments/neurology' },
    { id: '19', type: 'doctor', title: 'Dr. Sanjay Singh', subtitle: 'Senior Neurologist', icon: Stethoscope, url: '/doctors/sanjay-singh' },
    { id: '20', type: 'service', title: 'Epilepsy & Seizure Clinic', subtitle: 'Specialized neurology service', icon: BrainCircuit, url: '/services/epilepsy-clinic' },

    // --- Ophthalmology ---
    { id: '9', type: 'doctor', title: 'Dr. Priya Sharma', subtitle: 'Ophthalmologist • Eye surgeon', icon: Stethoscope, url: '/doctors/priya-sharma' },
    { id: '21', type: 'department', title: 'Ophthalmology Center', subtitle: 'Comprehensive eye care', icon: Eye, url: '/departments/ophthalmology' },
    { id: '22', type: 'service', title: 'LASIK & Refractive Surgery', subtitle: 'Vision correction procedures', icon: Eye, url: '/services/lasik' },

    // --- Pulmonology ---
    { id: '12', type: 'department', title: 'Pulmonology Department', subtitle: 'Respiratory and lung care unit', icon: Building, url: '/departments/pulmonology' },
    { id: '23', type: 'doctor', title: 'Dr. Vivek Mehra', subtitle: 'Pulmonologist • Asthma & COPD specialist', icon: Stethoscope, url: '/doctors/vivek-mehra' },

    // --- Gastroenterology ---
    { id: '25', type: 'department', title: 'Gastroenterology & Endoscopy', subtitle: 'Stomach and digestive health', icon: Building, url: '/departments/gastroenterology' },
    { id: '26', type: 'doctor', title: 'Dr. Fatima Khan', subtitle: 'Gastroenterologist', icon: Stethoscope, url: '/doctors/fatima-khan' },
    { id: '27', type: 'service', title: 'Endoscopy Procedure', subtitle: 'Diagnostic test for digestive tract', icon: Stethoscope, url: '/services/endoscopy' },

    // --- Orthopaedics ---
    { id: '10', type: 'department', title: 'Orthopaedics & Joint Replacement', subtitle: 'Treatment for bone and joint issues', icon: Building, url: '/departments/orthopaedics' },
    { id: '28', type: 'doctor', title: 'Dr. Arjun Reddy', subtitle: 'Orthopaedic Surgeon', icon: Stethoscope, url: '/doctors/arjun-reddy' },
    // --- ** FIX 1: Enriched subtitle to make it discoverable ---
    { id: '29', type: 'service', title: 'Physiotherapy & Rehabilitation', subtitle: 'Orthopaedics post-surgery and injury recovery', icon: User, url: '/services/physiotherapy' },

    // --- ENT ---
    { id: '11', type: 'doctor', title: 'Dr. Alok Verma', subtitle: 'ENT Specialist • 20 years experience', icon: Stethoscope, url: '/doctors/alok-verma' },
    { id: '30', type: 'department', title: 'ENT Department (Otorhinolaryngology)', subtitle: 'Ear, Nose & Throat clinic', icon: Ear, url: '/departments/ent' },
    { id: '31', type: 'service', title: 'Hearing Aid Clinic', subtitle: 'Audiology and hearing tests', icon: Ear, url: '/services/hearing-aids' },

    // --- Online Consultation ---
    { id: '7', type: 'service', title: 'Instant Online Consultation', subtitle: 'Connect with doctors via video 24/7', icon: Video, url: '/services/online-consultation' },
    { id: '32', type: 'doctor', title: 'General Physician (Online)', subtitle: 'For video consultation', icon: Stethoscope, url: '/doctors/online-gp' },
    { id: '33', type: 'service', title: 'Get a Second Opinion Online', subtitle: 'Consult a specialist from home', icon: Video, url: '/services/second-opinion' },

    // --- Lab Test ---
    { id: '8', type: 'service', title: 'Book a Lab Test at Home', subtitle: 'Schedule blood tests and more', icon: FlaskConical, url: '/services/lab-tests' },
    { id: '34', type: 'service', title: 'Full Body Health Checkup Package', subtitle: 'Comprehensive lab tests', icon: FlaskConical, url: '/services/health-checkup' },
    { id: '35', type: 'department', title: 'Central Laboratory', subtitle: 'Our main lab testing facility', icon: Building, url: '/departments/laboratory' },

    // --- Emergency Care ---
    { id: '4', type: 'service', title: '24/7 Emergency Services', subtitle: 'Ambulance and critical care', icon: Building, url: '/services/emergency' },
    { id: '36', type: 'department', title: 'Emergency Room & Trauma Center', subtitle: 'Located at Gate 1', icon: Building, url: '/departments/emergency' },
    { id: '37', type: 'service', title: 'Ambulance Service', subtitle: 'Call 102 for emergency pickup', icon: Stethoscope, url: '/services/ambulance' },
  ];

  // ... (useEffect, saveRecentSearch, etc. remain the same) ...
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`recentSearches_${user.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setRecentSearches(parsed.map((item: any) => ({ ...item, timestamp: new Date(item.timestamp) })));
        } catch (error) {
          console.error('Error parsing recent searches:', error);
        }
      }
    }
  }, [user]);

  const saveRecentSearch = (searchQuery: string, type: string = 'general') => {
    if (!user || !searchQuery.trim()) return;
    const newSearch: RecentSearch = { id: Date.now().toString(), query: searchQuery.trim(), timestamp: new Date(), type };
    const updated = [newSearch, ...recentSearches.filter(s => s.query !== searchQuery.trim())].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem(`recentSearches_${user.id}`, JSON.stringify(updated));
    if (user) {
      api.post('/api/search/save', { query: searchQuery.trim(), type, userId: user.id })
        .catch(error => console.error('Error saving search to backend:', error));
    }
  };


  // --- ** FIX 2: Relaxed the search logic back to a flexible 'includes' check ---
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const lowercasedQuery = searchQuery.toLowerCase();

      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(lowercasedQuery) ||
        result.subtitle.toLowerCase().includes(lowercasedQuery)
      );

      setResults(filtered);

    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  // --- **** END OF FIX **** ---


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      if (onSearch) onSearch(searchQuery);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    saveRecentSearch(result.title, result.type);
    setIsOpen(false);
    window.location.href = result.url;
  };

  const handleRecentSearchClick = (recentSearch: RecentSearch) => {
    setQuery(recentSearch.query);
    performSearch(recentSearch.query);
    if (onSearch) onSearch(recentSearch.query);
  };

  const handlePredefinedSearchClick = (item: PredefinedSearchItem) => {
    setQuery(item.query);
    performSearch(item.query);
    setIsOpen(true);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (user) localStorage.removeItem(`recentSearches_${user.id}`);
  };

  const removeRecentSearch = (searchId: string) => {
    const updated = recentSearches.filter(s => s.id !== searchId);
    setRecentSearches(updated);
    if (user) localStorage.setItem(`recentSearches_${user.id}`, JSON.stringify(updated));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(query);
            if (e.key === 'Escape') {
              setIsOpen(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={placeholder || t('search.placeholder')}
          className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
          >
            {isLoading && (
              <div className="p-4 text-center">
                <div className="w-6 h-6 border-2 border-medical-teal/30 border-t-medical-teal rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('search.searching')}</p>
              </div>
            )}

            {!isLoading && query && results.length > 0 && (
              <div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    {t('search.results')}
                  </h4>
                </div>
                <div className="py-2">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-card transition-colors flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0"><result.icon className="h-5 w-5 text-medical-teal" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{result.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{result.subtitle}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${result.type === 'doctor' ? 'bg-medical-blue/10 text-medical-blue' : result.type === 'department' ? 'bg-medical-teal/10 text-medical-teal' : result.type === 'service' ? 'bg-medical-green/10 text-medical-green' : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400'}`}>{result.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && query && results.length === 0 && (
              <div className="p-4 text-center">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('search.noResults')}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('search.tryDifferent')}</p>
              </div>
            )}

            {!query && user && recentSearches.length > 0 && (
              <div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"><Clock className="h-4 w-4 mr-2" />{t('search.recent')}</h4>
                  <button onClick={clearRecentSearches} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('search.clearAll')}</button>
                </div>
                <div className="py-2">
                  {recentSearches.slice(0, 5).map((search) => (
                    <div key={search.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors group">
                      <button onClick={() => handleRecentSearchClick(search)} className="flex-1 text-left flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white truncate">{search.query}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(search.timestamp)}</p>
                        </div>
                      </button>
                      <button onClick={() => removeRecentSearch(search.id)} className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!query && (!user || recentSearches.length === 0) && (
              <div className="py-2">
                {predefinedSearches.map((category) => (
                  <div key={category.categoryTitle}>
                    <div className="px-4 pt-4 pb-2">
                       <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <category.categoryIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {category.categoryTitle}
                      </h4>
                    </div>
                    <div className="pb-2">
                      {category.items.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handlePredefinedSearchClick(item)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-card transition-colors flex items-center space-x-3"
                        >
                          <div className="flex-shrink-0">
                            <item.icon className="h-5 w-5 text-medical-teal" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;