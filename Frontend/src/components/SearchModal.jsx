import { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetBlogsQuery } from '../store/apiSlice';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: blogs } = useGetBlogsQuery();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isOpen]);

  // Handle Cmd+K globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Typically we would open it here, but the trigger is often managed in the parent component.
          // This is just a backup listener.
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchResults = searchTerm.trim() === '' 
    ? [] 
    : (blogs || []).filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 results

  const handleSelect = (slug) => {
    navigate(`/blog/${slug}`);
    onClose();
    setSearchTerm('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-bg-primary border border-border-subtle rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-border-subtle">
          <Search className="w-5 h-5 text-text-secondary" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none py-4 px-3 text-lg focus:outline-none focus:ring-0 placeholder-text-secondary text-text-primary"
            placeholder="Search articles, tutorials, news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center gap-1 text-xs text-text-secondary font-medium px-2 py-1 bg-bg-secondary rounded border border-border-subtle">
            ESC
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() !== '' && searchResults.length === 0 ? (
            <div className="p-8 text-center text-text-secondary">
              No results found for "{searchTerm}"
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Results
              </div>
              {searchResults.map((blog) => (
                <button
                  key={blog._id}
                  className="w-full text-left px-4 py-3 hover:bg-bg-secondary transition-colors flex items-center justify-between group"
                  onClick={() => handleSelect(blog.slug)}
                >
                  <div>
                    <h4 className="font-medium text-text-primary group-hover:text-accent transition-colors">{blog.title}</h4>
                    <p className="text-xs text-text-secondary truncate max-w-sm mt-0.5">{blog.excerpt}</p>
                  </div>
                  <span className="text-xs text-text-secondary capitalize">{blog.category?.name || 'Article'}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-secondary mb-4">
                <Command className="w-5 h-5 text-text-secondary" />
              </div>
              <p className="text-text-secondary">Type to start searching...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
