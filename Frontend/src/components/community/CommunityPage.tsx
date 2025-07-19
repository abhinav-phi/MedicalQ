import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Heart, 
  Brain, 
  Activity, 
  Bone, 
  Eye, 
  Pill, 
  Baby, 
  Stethoscope,
  ArrowRight,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  User,
  Calendar,
  Tag
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Community {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  members: number;
  posts: number;
  activeNow: number;
  trending: boolean;
  category: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'patient' | 'doctor';
    verified: boolean;
  };
  community: string;
  createdAt: Date;
  upvotes: number;
  comments: number;
  tags: string[];
  isBookmarked: boolean;
  hasUpvoted: boolean;
}

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    community: '',
    tags: ''
  });

  const communities: Community[] = [
    {
      id: 'cardiology',
      name: t('community.cardiology'),
      description: t('community.cardiologyDesc'),
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      members: 2847,
      posts: 1234,
      activeNow: 23,
      trending: true,
      category: 'medical'
    },
    {
      id: 'neurology',
      name: t('community.neurology'),
      description: t('community.neurologyDesc'),
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      members: 1923,
      posts: 856,
      activeNow: 18,
      trending: true,
      category: 'medical'
    },
    {
      id: 'orthopedics',
      name: t('community.orthopedics'),
      description: t('community.orthopedicsDesc'),
      icon: Bone,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      members: 1789,
      posts: 743,
      activeNow: 12,
      trending: false,
      category: 'medical'
    },
    {
      id: 'diabetes',
      name: t('community.diabetes'),
      description: t('community.diabetesDesc'),
      icon: Pill,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      members: 2156,
      posts: 967,
      activeNow: 28,
      trending: true,
      category: 'lifestyle'
    },
    {
      id: 'pediatrics',
      name: t('community.pediatrics'),
      description: t('community.pediatricsDesc'),
      icon: Baby,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      members: 1654,
      posts: 521,
      activeNow: 15,
      trending: false,
      category: 'medical'
    },
    {
      id: 'mental-health',
      name: t('community.mentalHealth'),
      description: t('community.mentalHealthDesc'),
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      members: 3421,
      posts: 1876,
      activeNow: 45,
      trending: true,
      category: 'wellness'
    }
  ];

  // Mock posts data
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Managing post-surgery recovery - Tips and experiences',
        content: 'I recently had cardiac surgery and wanted to share some recovery tips that helped me. The first few weeks were challenging, but with proper care and following doctor\'s advice, I\'m feeling much better now.',
        author: {
          id: 'user1',
          name: 'Sarah Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          role: 'patient',
          verified: false
        },
        community: 'cardiology',
        createdAt: new Date('2025-01-14T10:30:00Z'),
        upvotes: 45,
        comments: 12,
        tags: ['recovery', 'surgery', 'tips'],
        isBookmarked: false,
        hasUpvoted: false
      },
      {
        id: '2',
        title: 'Understanding diabetes management in daily life',
        content: 'As an endocrinologist, I often get questions about daily diabetes management. Here are some evidence-based strategies that can help maintain stable blood sugar levels throughout the day.',
        author: {
          id: 'doc1',
          name: 'Dr. Michael Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
          role: 'doctor',
          verified: true
        },
        community: 'diabetes',
        createdAt: new Date('2025-01-14T08:15:00Z'),
        upvotes: 78,
        comments: 23,
        tags: ['diabetes', 'management', 'lifestyle'],
        isBookmarked: true,
        hasUpvoted: true
      },
      {
        id: '3',
        title: 'Coping with anxiety during medical treatments',
        content: 'Medical treatments can be overwhelming. I wanted to share some coping strategies that have helped me manage anxiety during my treatment journey. Remember, it\'s okay to ask for help.',
        author: {
          id: 'user2',
          name: 'Alex Rivera',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
          role: 'patient',
          verified: false
        },
        community: 'mental-health',
        createdAt: new Date('2025-01-13T16:45:00Z'),
        upvotes: 34,
        comments: 8,
        tags: ['anxiety', 'coping', 'support'],
        isBookmarked: false,
        hasUpvoted: false
      }
    ];
    setPosts(mockPosts);
  }, []);

  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCommunity = selectedCommunity === 'all' || post.community === selectedCommunity;
    return matchesSearch && matchesCommunity;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.upvotes + b.comments) - (a.upvotes + a.comments);
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  const handleCreatePost = () => {
    if (!user) {
      alert(t('community.loginRequired'));
      return;
    }
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert(t('community.fillRequired'));
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        role: user.role === 'doctor' ? 'doctor' : 'patient',
        verified: user.isVerified
      },
      community: newPost.community || 'general',
      createdAt: new Date(),
      upvotes: 0,
      comments: 0,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isBookmarked: false,
      hasUpvoted: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', community: '', tags: '' });
    setShowCreatePost(false);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ${t('community.daysAgo')}`;
    if (hours > 0) return `${hours} ${t('community.hoursAgo')}`;
    return t('community.justNow');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('community.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('community.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('community.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
              >
                <option value="all">{t('community.allCommunities')}</option>
                {communities.map(community => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
              >
                <option value="trending">{t('community.trending')}</option>
                <option value="recent">{t('community.recent')}</option>
                <option value="popular">{t('community.popular')}</option>
              </select>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreatePost(true)}
                className="px-6 py-3 bg-medical-gradient text-white rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>{t('community.createPost')}</span>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Communities Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-medical-teal" />
                {t('community.communities')}
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCommunity('all')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCommunity === 'all' 
                      ? 'bg-medical-teal/10 text-medical-teal border border-medical-teal/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-dark-card text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('community.allCommunities')}</span>
                    <span className="text-sm opacity-60">{posts.length}</span>
                  </div>
                </button>
                
                {filteredCommunities.map((community) => (
                  <button
                    key={community.id}
                    onClick={() => setSelectedCommunity(community.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCommunity === community.id 
                        ? `${community.bgColor} ${community.color} border ${community.borderColor}` 
                        : 'hover:bg-gray-50 dark:hover:bg-dark-card text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <community.icon className={`h-5 w-5 ${community.color}`} />
                      <span className="font-medium">{community.name}</span>
                      {community.trending && (
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <div className="text-xs opacity-60 ml-8">
                      {community.members.toLocaleString()} {t('community.members')} • {community.activeNow} {t('community.online')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {post.author.name}
                          </span>
                          {post.author.verified && (
                            <Stethoscope className="h-4 w-4 text-medical-blue" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.author.role === 'doctor' 
                              ? 'bg-medical-blue/10 text-medical-blue' 
                              : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400'
                          }`}>
                            {post.author.role === 'doctor' ? t('community.doctor') : t('community.patient')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{formatTimeAgo(post.createdAt)}</span>
                          <span>•</span>
                          <span>{communities.find(c => c.id === post.community)?.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 text-xs rounded-full flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                    <div className="flex items-center space-x-6">
                      <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        post.hasUpvoted 
                          ? 'bg-medical-teal/10 text-medical-teal' 
                          : 'hover:bg-gray-100 dark:hover:bg-dark-card text-gray-600 dark:text-gray-400'
                      }`}>
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.upvotes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card text-gray-600 dark:text-gray-400 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card text-gray-600 dark:text-gray-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm font-medium">{t('community.share')}</span>
                      </button>
                    </div>
                    
                    <button className={`p-2 rounded-lg transition-colors ${
                      post.isBookmarked 
                        ? 'text-medical-teal' 
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}>
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        <AnimatePresence>
          {showCreatePost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowCreatePost(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t('community.createNewPost')}
                    </h3>
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('community.postTitle')}
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={t('community.postTitlePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('community.community')}
                    </label>
                    <select
                      value={newPost.community}
                      onChange={(e) => setNewPost(prev => ({ ...prev, community: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                    >
                      <option value="">{t('community.selectCommunity')}</option>
                      {communities.map(community => (
                        <option key={community.id} value={community.id}>
                          {community.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('community.content')}
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder={t('community.contentPlaceholder')}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('community.tags')}
                    </label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder={t('community.tagsPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-medical-teal bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                    >
                      {t('community.cancel')}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreatePost}
                      className="px-6 py-2 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    >
                      {t('community.publishPost')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityPage;