const express = require('express');
const router = express.Router();
const { verifyToken, optionalAuth } = require('../Middlewares/Auth');

// Mock search controller
const SearchController = {
  // Save search query
  async saveSearch(req, res) {
    try {
      const { query, type, userId } = req.body;

      if (!query || !query.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      // In real app, save to database
      const searchRecord = {
        id: Date.now().toString(),
        userId: userId || req.user?.id,
        query: query.trim(),
        type: type || 'general',
        timestamp: new Date().toISOString()
      };

      console.log('Search saved:', searchRecord);

      res.json({
        success: true,
        message: 'Search saved successfully',
        data: searchRecord
      });

    } catch (error) {
      console.error('Save search error:', error);
      res.status(500).json({
        success: false,
        message: 'Error saving search'
      });
    }
  },

  // Get user's recent searches
  async getRecentSearches(req, res) {
    try {
      const { limit = 10 } = req.query;

      // Mock recent searches
      const mockSearches = [
        {
          id: '1',
          userId: req.user.id,
          query: 'cardiology',
          type: 'department',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 min ago
        },
        {
          id: '2',
          userId: req.user.id,
          query: 'Dr. Rajesh Kumar',
          type: 'doctor',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
        },
        {
          id: '3',
          userId: req.user.id,
          query: 'emergency services',
          type: 'service',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
        }
      ];

      const limitedSearches = mockSearches.slice(0, parseInt(limit));

      res.json({
        success: true,
        data: {
          searches: limitedSearches
        }
      });

    } catch (error) {
      console.error('Get recent searches error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recent searches'
      });
    }
  },

  // Perform search
  async search(req, res) {
    try {
      const { q: query, type, limit = 10, page = 1 } = req.query;

      if (!query || !query.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      // Mock search results
      const mockResults = [
        {
          id: '1',
          type: 'doctor',
          title: 'Dr. Rajesh Kumar',
          subtitle: 'Cardiologist • 15 years experience',
          url: '/doctors/rajesh-kumar',
          relevance: 0.95
        },
        {
          id: '2',
          type: 'department',
          title: 'Cardiology Department',
          subtitle: 'Heart care and cardiac surgery',
          url: '/departments/cardiology',
          relevance: 0.90
        },
        {
          id: '3',
          type: 'service',
          title: 'Emergency Services',
          subtitle: '24/7 emergency medical care',
          url: '/services/emergency',
          relevance: 0.85
        },
        {
          id: '4',
          type: 'doctor',
          title: 'Dr. Meera Gupta',
          subtitle: 'Oncologist • Cancer specialist',
          url: '/doctors/meera-gupta',
          relevance: 0.80
        }
      ];

      // Filter by query
      let filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(query.toLowerCase())
      );

      // Filter by type if specified
      if (type && type !== 'all') {
        filteredResults = filteredResults.filter(result => result.type === type);
      }

      // Sort by relevance
      filteredResults.sort((a, b) => b.relevance - a.relevance);

      // Apply pagination
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = startIndex + parseInt(limit);
      const paginatedResults = filteredResults.slice(startIndex, endIndex);

      // Save search if user is logged in
      if (req.user) {
        // In real app, save to database
        console.log(`Search performed by user ${req.user.id}: "${query}"`);
      }

      res.json({
        success: true,
        data: {
          results: paginatedResults,
          query: query.trim(),
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(filteredResults.length / parseInt(limit)),
            totalResults: filteredResults.length,
            hasNext: endIndex < filteredResults.length,
            hasPrev: startIndex > 0
          }
        }
      });

    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({
        success: false,
        message: 'Error performing search'
      });
    }
  },

  // Get search suggestions/autocomplete
  async getSuggestions(req, res) {
    try {
      const { q: query, limit = 5 } = req.query;

      if (!query || query.trim().length < 2) {
        return res.json({
          success: true,
          data: {
            suggestions: []
          }
        });
      }

      // Mock suggestions
      const mockSuggestions = [
        'Cardiology',
        'Cardiologist',
        'Cardiac surgery',
        'Dr. Rajesh Kumar',
        'Emergency services',
        'Diabetes care',
        'Dermatology',
        'Pediatrics',
        'Mental health',
        'Orthopedics'
      ];

      const filteredSuggestions = mockSuggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, parseInt(limit));

      res.json({
        success: true,
        data: {
          suggestions: filteredSuggestions,
          query: query.trim()
        }
      });

    } catch (error) {
      console.error('Get suggestions error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching suggestions'
      });
    }
  }
};

// Routes
router.post('/save', verifyToken, SearchController.saveSearch);
router.get('/recent', verifyToken, SearchController.getRecentSearches);
router.get('/suggestions', optionalAuth, SearchController.getSuggestions);
router.get('/', optionalAuth, SearchController.search);

module.exports = router;