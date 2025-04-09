import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import LandingPage from './components/LandingPage';
import './App.css';
import './styles/LandingPage.css';

function DiaryApp() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [mood, setMood] = useState('neutral');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const formRef = useRef(null);
  const entryCardRefs = useRef({});

  // Set the base URL for your API
  const API_URL = 'http://127.0.0.1:8000/api/dairyentry/';

  // Get all entries on component mount
  useEffect(() => {
    fetchEntries();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('diaryTheme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Apply dark mode when it changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('diaryTheme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('diaryTheme', 'light');
    }
  }, [darkMode]);

  // Handle notifications
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Scroll to form when editing
  useEffect(() => {
    if (isEditing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isEditing]);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      // Sort entries by date (newest first)
      const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(sortedEntries);
      setError(null);
    } catch (err) {
      setError('Failed to fetch entries. Please try again later.');
      console.error('Error fetching entries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    const entryData = {
      title,
      content,
      date: date || format(new Date(), 'yyyy-MM-dd'),
      mood
    };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}${currentEntryId}/`, entryData);
        showNotification('Entry updated successfully!', 'success');
      } else {
        await axios.post(API_URL, entryData);
        showNotification('New entry added successfully!', 'success');
      }
      
      // Reset form and refresh entries
      resetForm();
      fetchEntries();
      
      // Hide form after submission
      if (!isEditing) {
        setTimeout(() => setShowForm(false), 500);
      }
    } catch (err) {
      showNotification('Failed to save entry. Please try again.', 'error');
      console.error('Error saving entry:', err);
    }
  };

  const editEntry = (entry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setDate(entry.date);
    setMood(entry.mood || 'neutral');
    setIsEditing(true);
    setCurrentEntryId(entry.id);
    setShowForm(true);
    
    // Highlight the card being edited
    if (entryCardRefs.current[entry.id]) {
      entryCardRefs.current[entry.id].classList.add('card-highlight');
      setTimeout(() => {
        if (entryCardRefs.current[entry.id]) {
          entryCardRefs.current[entry.id].classList.remove('card-highlight');
        }
      }, 1000);
    }
  };

  const deleteEntry = async (id) => {
    // Add exit animation before actually deleting
    if (entryCardRefs.current[id]) {
      entryCardRefs.current[id].classList.add('card-exit');
      
      // Wait for animation to complete
      setTimeout(async () => {
        try {
          await axios.delete(`${API_URL}${id}/`);
          fetchEntries();
          showNotification('Entry deleted successfully', 'success');
        } catch (err) {
          showNotification('Failed to delete entry. Please try again.', 'error');
          console.error('Error deleting entry:', err);
        }
      }, 300);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setMood('neutral');
    setIsEditing(false);
    setCurrentEntryId(null);
  };

  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredEntries = entries.filter(entry => {
    // Filter by search term
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by mood
    const matchesMood = filterMood === 'all' || entry.mood === filterMood;
    
    return matchesSearch && matchesMood;
  });

  const getMoodEmoji = (mood) => {
    switch(mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'excited': return '🤩';
      case 'anxious': return '😰';
      default: return '😐';
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="header-content">
          <h1>My Personal Diary</h1>
          <div className="header-controls">
            <button 
              className="btn theme-toggle" 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="controls-bar">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={filterMood} 
            onChange={(e) => setFilterMood(e.target.value)}
            className="mood-filter"
          >
            <option value="all">All Moods</option>
            <option value="happy">Happy 😊</option>
            <option value="sad">Sad 😢</option>
            <option value="angry">Angry 😠</option>
            <option value="excited">Excited 🤩</option>
            <option value="anxious">Anxious 😰</option>
            <option value="neutral">Neutral 😐</option>
          </select>
        </div>
        
        <button 
          className={`btn new-entry-btn ${showForm ? 'active' : ''}`}
          onClick={() => {
            if (isEditing) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Hide Form' : 'New Entry'}
        </button>
      </div>

      <div className="main-content">
        {showForm && (
          <section 
            className={`entry-form ${showForm ? 'form-visible' : 'form-hidden'}`}
            ref={formRef}
          >
            <h2>{isEditing ? 'Edit Entry' : 'New Entry'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title <span className="required">*</span></label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entry title"
                  className="animated-input"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group date-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="animated-input"
                  />
                </div>
                
                <div className="form-group mood-group">
                  <label htmlFor="mood">Mood</label>
                  <select
                    id="mood"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="animated-input"
                  >
                    <option value="happy">Happy 😊</option>
                    <option value="sad">Sad 😢</option>
                    <option value="angry">Angry 😠</option>
                    <option value="excited">Excited 🤩</option>
                    <option value="anxious">Anxious 😰</option>
                    <option value="neutral">Neutral 😐</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Content <span className="required">*</span></label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind today?"
                  rows="6"
                  className="animated-input"
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="btn save-btn">
                  {isEditing ? 'Update Entry' : 'Save Entry'}
                </button>
                <button 
                  type="button" 
                  className="btn cancel-btn"
                  onClick={() => {
                    resetForm();
                    if (!isEditing) {
                      setShowForm(false);
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="entries-list">
          <h2>
            My Entries 
            {filteredEntries.length > 0 && <span className="entry-count">({filteredEntries.length})</span>}
          </h2>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your memories...</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="empty-state">
              <p>{searchTerm || filterMood !== 'all' ? 'No entries match your search.' : 'No entries yet. Start writing!'}</p>
              {(searchTerm || filterMood !== 'all') && (
                <button 
                  className="btn clear-filters-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterMood('all');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="entries-container">
              {filteredEntries.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className={`entry-card card-enter mood-${entry.mood || 'neutral'}`}
                  style={{animationDelay: `${index * 0.05}s`}}
                  ref={el => entryCardRefs.current[entry.id] = el}
                >
                  <div className="entry-header">
                    <h3>{entry.title}</h3>
                    <span className="mood-indicator" title={entry.mood || 'neutral'}>
                      {getMoodEmoji(entry.mood)}
                    </span>
                  </div>
                  
                  <p className="entry-date">
                    {format(new Date(entry.date), 'EEEE, MMMM do, yyyy')}
                  </p>
                  
                  <div className="entry-content">
                    <p>
                      {entry.content.length > 150
                        ? `${entry.content.substring(0, 150)}...`
                        : entry.content}
                    </p>
                    {entry.content.length > 150 && (
                      <div className="fade-overlay"></div>
                    )}
                  </div>
                  
                  <div className="entry-actions">
                    <button 
                      className="btn edit-btn"
                      onClick={() => editEntry(entry)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn delete-btn"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this entry?')) {
                          deleteEntry(entry.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diary" element={<DiaryApp />} />
      </Routes>
    </Router>
  );
}

export default App;