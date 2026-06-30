import { useState, useEffect } from 'react';
import { useGetSettingsQuery, useUpdateSettingsMutation, useUpdateCredentialsMutation } from '../../store/apiSlice';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const Settings = () => {
  const { data: settings, isLoading } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

  const [formData, setFormData] = useState({
    profileImage: '', email: '', location: '', shortBio: '', heroContent: '',
    socialLinks: { github: '', linkedin: '', portfolio: '', itchio: '', twitter: '' }
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '', newEmail: '', newPassword: ''
  });
  const [updateCredentials, { isLoading: isUpdatingSecurity }] = useUpdateCredentialsMutation();

  useEffect(() => {
    if (settings) {
      setFormData({
        profileImage: settings.profileImage || '',
        email: settings.email || '',
        location: settings.location || '',
        shortBio: settings.shortBio || '',
        heroContent: settings.heroContent || '',
        socialLinks: settings.socialLinks || { github: '', linkedin: '', portfolio: '', itchio: '', twitter: '' }
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.split('_')[1];
      setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [socialKey]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(formData).unwrap();
      toast.success('Settings updated globally');
    } catch (err) {
      toast.error('Failed to update settings');
    }
  };

  const handleSecurityChange = (e) => {
    setSecurityData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    if (!securityData.currentPassword) {
      toast.error('Current password is required');
      return;
    }
    
    try {
      await updateCredentials(securityData).unwrap();
      toast.success('Credentials updated successfully. Please log in again.');
      
      // Force logout on success for security reasons
      setTimeout(() => {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }, 1500);
      
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update credentials');
    }
  };

  if (isLoading) return <div className="p-8">Loading configurations...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Site Settings</h1>
          <p className="text-text-secondary text-sm">Manage global configurations and identity</p>
        </div>
        <button onClick={handleSubmit} disabled={isUpdating} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> {isUpdating ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Basic Identity */}
        <div className="bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm space-y-4">
          <h2 className="text-lg font-bold border-b border-border-subtle pb-2">Global Identity</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Image URL</label>
            <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Short Bio (Footer/Sidebar)</label>
            <textarea name="shortBio" value={formData.shortBio} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-border-subtle rounded-lg"></textarea>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm space-y-4">
          <h2 className="text-lg font-bold border-b border-border-subtle pb-2">Social Links</h2>
          <div className="space-y-3">
            {['github', 'linkedin', 'portfolio', 'itchio', 'twitter'].map(platform => (
              <div key={platform} className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium capitalize">{platform}</label>
                <input type="url" name={`social_${platform}`} value={formData.socialLinks[platform] || ''} onChange={handleChange} placeholder={`https://${platform}.com/...`} className="flex-1 px-3 py-2 border border-border-subtle rounded-lg" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Security / Credentials */}
      <div className="bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm space-y-4">
        <h2 className="text-lg font-bold border-b border-border-subtle pb-2 text-red-400">Security Settings</h2>
        <p className="text-sm text-text-secondary">Update your admin email or password. You will be logged out upon a successful change.</p>
        
        <form onSubmit={handleSecuritySubmit} className="space-y-4 max-w-xl pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password <span className="text-red-500">*</span></label>
            <input type="password" name="currentPassword" value={securityData.currentPassword} onChange={handleSecurityChange} required className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:border-accent" placeholder="Verify current password" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">New Email Address <span className="text-xs text-text-secondary font-normal">(Optional)</span></label>
            <input type="email" name="newEmail" value={securityData.newEmail} onChange={handleSecurityChange} className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:border-accent" placeholder="Leave blank to keep current" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Password <span className="text-xs text-text-secondary font-normal">(Optional)</span></label>
            <input type="password" name="newPassword" value={securityData.newPassword} onChange={handleSecurityChange} className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:border-accent" placeholder="Leave blank to keep current" />
          </div>

          <button type="submit" disabled={isUpdatingSecurity} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
            {isUpdatingSecurity ? 'Updating...' : 'Update Credentials'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default Settings;
