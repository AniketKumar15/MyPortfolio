import { useState } from 'react';
import { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } from '../../store/apiSlice';
import toast from 'react-hot-toast';
import { Trash2, Plus } from 'lucide-react';

const CategoryManager = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
      await createCategory({ name, slug: generatedSlug, description }).unwrap();
      toast.success('Category created');
      setName('');
      setDescription('');
    } catch (err) {
      toast.error(err.data?.message || 'Failed to create category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
        toast.success('Category deleted');
      } catch (err) {
        toast.error(err.data?.message || 'Failed to delete category');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Categories</h1>
        <p className="text-text-secondary">Organize your publications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-[#151515] p-6 border border-border-subtle rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Add New Category</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm bg-bg-secondary"
                  placeholder="e.g. Tutorials"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:border-accent text-sm bg-bg-secondary min-h-[100px]"
                  placeholder="Optional description"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isCreating}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> {isCreating ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-[#151515] border border-border-subtle rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-secondary border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-3 font-semibold text-text-secondary">Name</th>
                  <th className="px-6 py-3 font-semibold text-text-secondary">Slug</th>
                  <th className="px-6 py-3 font-semibold text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {isLoading ? (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-text-secondary">Loading...</td></tr>
                ) : categories?.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-text-secondary">No categories found.</td></tr>
                ) : (
                  categories?.map((cat) => (
                    <tr key={cat._id} className="hover:bg-bg-secondary transition-colors">
                      <td className="px-6 py-4 font-medium">{cat.name}</td>
                      <td className="px-6 py-4 text-text-secondary">{cat.slug}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(cat._id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
