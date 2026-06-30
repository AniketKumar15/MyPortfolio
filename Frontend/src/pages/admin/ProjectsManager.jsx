import { useState } from 'react';
import { 
  useGetProjectsQuery, 
  useCreateProjectMutation, 
  useUpdateProjectMutation, 
  useDeleteProjectMutation 
} from '../../store/apiSlice';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const ProjectsManager = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = {
    title: '', slug: '', shortDescription: '', longDescription: '', contribution: '', 
    status: 'In Development', featured: false, isHero: false, order: 0, 
    thumbnail: '', galleryImages: '', liveDemoUrl: '', githubUrl: '', itchioUrl: '', 
    techStack: '', challenges: '', solutions: '', developmentProcess: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEdit = (project) => {
    setFormData({ 
      ...project, 
      techStack: project.techStack?.join(', ') || '',
      galleryImages: project.galleryImages?.join(', ') || ''
    });
    setEditingId(project._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        ...formData, 
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
        galleryImages: formData.galleryImages.split(',').map(s => s.trim()).filter(Boolean),
        order: Number(formData.order)
      };
      
      if (editingId) {
        await updateProject({ id: editingId, ...payload }).unwrap();
        toast.success('Project updated');
      } else {
        await createProject(payload).unwrap();
        toast.success('Project created');
      }
      resetForm();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
        toast.success('Project deleted');
      } catch (err) {
        toast.error('Deletion failed');
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Projects Manager</h1>
          <p className="text-text-secondary text-sm">Manage your portfolio showcase and case studies</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-[#151515] border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-text-secondary">Loading projects...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-secondary border-b border-border-subtle text-text-secondary">
              <tr>
                <th className="p-4 font-medium w-16 text-center">Order</th>
                <th className="p-4 font-medium">Project</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Homepage Featured</th>
                <th className="p-4 font-medium text-center">Portfolio Hero</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...projects || []].sort((a,b) => a.order - b.order).map(project => (
                <tr key={project._id} className="border-b border-border-subtle last:border-0 hover:bg-bg-secondary/50 transition-colors">
                  <td className="p-4 font-bold text-center text-text-secondary">{project.order}</td>
                  <td className="p-4">
                    <div className="font-bold text-text-primary">{project.title}</div>
                    <div className="text-xs text-text-secondary">{project.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-bg-secondary border border-border-subtle rounded-md text-xs">{project.status}</span>
                  </td>
                  <td className="p-4 text-center">
                    {project.featured ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-text-secondary">No</span>}
                  </td>
                  <td className="p-4 text-center">
                    {project.isHero ? <span className="text-accent font-bold">Hero</span> : <span className="text-text-secondary">-</span>}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEdit(project)} className="p-2 text-text-secondary hover:text-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(project._id)} className="p-2 text-text-secondary hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle bg-bg-secondary shrink-0">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={resetForm} className="text-text-secondary hover:text-text-primary"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-8">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b border-border-subtle pb-2">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Title *</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Slug *</label>
                    <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg">
                      <option>Planning</option>
                      <option>In Development</option>
                      <option>Completed</option>
                      <option>On Hold</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Display Order</label>
                    <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                  </div>
                  <div className="space-y-1 flex flex-col justify-center gap-2 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 rounded text-accent" />
                      <span className="text-sm font-medium">Homepage Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.isHero} onChange={e => setFormData({...formData, isHero: e.target.checked})} className="w-4 h-4 rounded text-accent" />
                      <span className="text-sm font-medium">Portfolio Hero (Top)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Game Metadata */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b border-border-subtle pb-2">Game Metadata</h3>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Short Description (Card) *</label>
                  <textarea required value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" rows="2"></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">My Contribution / Role</label>
                  <input type="text" placeholder="e.g. Lead Programmer, AI Systems..." value={formData.contribution} onChange={e => setFormData({...formData, contribution: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tech Stack (comma separated)</label>
                  <input type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                </div>
              </div>

              {/* Media & Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b border-border-subtle pb-2">Media & Links</h3>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Thumbnail Image URL</label>
                  <input type="url" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Gallery Images (comma separated URLs)</label>
                  <textarea value={formData.galleryImages} onChange={e => setFormData({...formData, galleryImages: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" rows="2"></textarea>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Live Demo URL</label>
                    <input type="url" value={formData.liveDemoUrl} onChange={e => setFormData({...formData, liveDemoUrl: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Itch.io URL</label>
                    <input type="url" value={formData.itchioUrl} onChange={e => setFormData({...formData, itchioUrl: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Deep Case Study */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b border-border-subtle pb-2">Case Study</h3>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Overview (Long Description)</label>
                  <textarea value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" rows="4"></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Challenges Faced</label>
                  <textarea value={formData.challenges} onChange={e => setFormData({...formData, challenges: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" rows="3"></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Solutions & Outcomes</label>
                  <textarea value={formData.solutions} onChange={e => setFormData({...formData, solutions: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" rows="3"></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Development Process</label>
                  <textarea value={formData.developmentProcess} onChange={e => setFormData({...formData, developmentProcess: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" rows="3"></textarea>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 shrink-0 border-t border-border-subtle mt-8">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-sm font-bold text-text-secondary hover:bg-bg-secondary rounded-lg">Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Save Changes' : 'Create Project'}</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
