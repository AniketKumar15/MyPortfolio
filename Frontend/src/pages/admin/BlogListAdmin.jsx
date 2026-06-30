import { useGetAdminBlogsQuery, useDeleteBlogMutation } from '../../store/apiSlice';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogListAdmin = () => {
  const { data: blogs, isLoading } = useGetAdminBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post permanently?')) {
      try {
        await deleteBlog(id).unwrap();
        toast.success('Post deleted successfully');
      } catch (err) {
        toast.error(err.data?.message || 'Failed to delete post');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Posts</h1>
          <p className="text-text-secondary">Manage your publications and drafts.</p>
        </div>
        <Link to="/admin/blogs/create" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-[#151515] border border-border-subtle rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-secondary border-b border-border-subtle">
              <tr>
                <th className="px-6 py-3 font-semibold text-text-secondary">Title</th>
                <th className="px-6 py-3 font-semibold text-text-secondary">Status</th>
                <th className="px-6 py-3 font-semibold text-text-secondary">Category</th>
                <th className="px-6 py-3 font-semibold text-text-secondary">Date</th>
                <th className="px-6 py-3 font-semibold text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-text-secondary">Loading posts...</td></tr>
              ) : blogs?.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-text-secondary">No posts found. Create one!</td></tr>
              ) : (
                blogs?.map((blog) => (
                  <tr key={blog._id} className="hover:bg-bg-secondary transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium truncate max-w-[300px]">{blog.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {blog.category?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/blog/${blog.slug}`} target="_blank" className="p-2 text-text-secondary hover:text-accent transition-colors" title="View live">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link to={`/admin/blogs/edit/${blog._id}`} className="p-2 text-text-secondary hover:text-accent transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-500 hover:text-red-700 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogListAdmin;
