import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TiptapEditor from '../../components/admin/TiptapEditor';
import { Save, Settings, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateBlogMutation, useGetCategoriesQuery } from '../../store/apiSlice';
import { Link } from 'react-router-dom';

const BlogCreate = () => {
  const navigate = useNavigate();
  
  // Queries & Mutations
  const { data: categories } = useGetCategoriesQuery();
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  
  // Settings Panel State
  const [showSettings, setShowSettings] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title]);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      return toast.error('Title and content are required.');
    }
    if (!categoryId) {
      return toast.error('Please select a category in settings.');
    }

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      content,
      excerpt,
      category: categoryId,
      featuredImage,
      status,
      readingTime: Math.ceil(content.split(' ').length / 200) || 1
    };

    try {
      await createBlog(payload).unwrap();
      toast.success(`Blog successfully ${status === 'published' ? 'published' : 'saved as draft'}!`);
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Failed to create blog', err);
      toast.error(err.data?.message || 'Failed to create blog. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/blogs" className="p-2 text-text-secondary hover:text-accent hover:bg-bg-secondary rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">Write a Post</h1>
            <div className="flex items-center text-sm text-text-secondary gap-2">
              <span className={status === 'draft' ? 'text-yellow-600' : 'text-green-600'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
              <span>Not saved yet</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-md transition-colors border ${showSettings ? 'bg-bg-secondary border-border-subtle text-accent' : 'border-transparent text-text-secondary hover:text-accent hover:bg-bg-secondary'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handlePublish}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-black/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" /> 
            {isLoading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Editor Area */}
        <div className={`flex-1 transition-all duration-300 ${showSettings ? 'w-2/3' : 'w-full'}`}>
          <div className="bg-[#151515] border border-border-subtle rounded-xl shadow-sm p-8 md:p-12">
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-none text-4xl md:text-5xl font-bold placeholder-gray-300 focus:outline-none focus:ring-0 tracking-tight mb-8"
            />
            
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Post Settings Sidebar */}
        {showSettings && (
          <div className="w-1/3 flex-shrink-0 space-y-6">
            <div className="bg-[#151515] border border-border-subtle rounded-xl shadow-sm p-6 space-y-6">
              <h3 className="font-semibold text-lg border-b border-border-subtle pb-4">Post Settings</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">URL Slug</label>
                <input 
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="custom-url-slug"
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Category *</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm"
                >
                  <option value="">Select Category</option>
                  {categories?.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Featured Image URL</label>
                <input 
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm"
                />
                {featuredImage && (
                  <img src={featuredImage} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-md border border-border-subtle" />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Excerpt</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary for listings..."
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm min-h-[100px]"
                ></textarea>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCreate;
