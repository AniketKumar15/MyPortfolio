import { useState } from 'react';
import { 
  useGetSkillsQuery, useCreateSkillMutation, useDeleteSkillMutation,
  useGetExperiencesQuery, useCreateExperienceMutation, useDeleteExperienceMutation,
  useGetEducationsQuery, useCreateEducationMutation, useDeleteEducationMutation
} from '../../store/apiSlice';
import toast from 'react-hot-toast';
import { Trash2, Plus } from 'lucide-react';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('skills');

  // Queries
  const { data: skills, isLoading: loadingSkills } = useGetSkillsQuery();
  const { data: experiences, isLoading: loadingExp } = useGetExperiencesQuery();
  const { data: educations, isLoading: loadingEdu } = useGetEducationsQuery();

  // Mutations
  const [createSkill] = useCreateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [createExperience] = useCreateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const [createEducation] = useCreateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  // Forms
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Game Engines', skillLevel: 80 });
  const [expForm, setExpForm] = useState({ companyName: '', role: '', startDate: '', description: '' });
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', startDate: '' });

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try { await createSkill(skillForm).unwrap(); setSkillForm({ name: '', category: 'Game Engines', skillLevel: 80 }); toast.success('Skill added'); } 
    catch (err) { toast.error('Failed to add skill'); }
  };

  const handleAddExp = async (e) => {
    e.preventDefault();
    try { await createExperience(expForm).unwrap(); setExpForm({ companyName: '', role: '', startDate: '', description: '' }); toast.success('Experience added'); } 
    catch (err) { toast.error('Failed to add experience'); }
  };

  const handleAddEdu = async (e) => {
    e.preventDefault();
    try { await createEducation(eduForm).unwrap(); setEduForm({ institution: '', degree: '', startDate: '' }); toast.success('Education added'); } 
    catch (err) { toast.error('Failed to add education'); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Resume Builder</h1>
        <p className="text-text-secondary text-sm mb-6">Manage your Skills, Experience, and Education</p>
        
        <div className="flex gap-2 border-b border-border-subtle">
          {['skills', 'experience', 'education'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-bold capitalize border-b-2 ${activeTab === tab ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ADD FORM SECTION */}
        <div className="lg:col-span-1 bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4 capitalize">Add New {activeTab}</h2>
          
          {activeTab === 'skills' && (
            <form onSubmit={handleAddSkill} className="space-y-4">
              <input type="text" placeholder="Skill Name (e.g. Unity)" required value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <select value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg">
                <option>Game Engines</option><option>Languages</option><option>Tools</option>
              </select>
              <input type="number" placeholder="Proficiency (1-100)" required value={skillForm.skillLevel} onChange={e => setSkillForm({...skillForm, skillLevel: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <button type="submit" className="btn-primary w-full">Add Skill</button>
            </form>
          )}

          {activeTab === 'experience' && (
            <form onSubmit={handleAddExp} className="space-y-4">
              <input type="text" placeholder="Company Name" required value={expForm.companyName} onChange={e => setExpForm({...expForm, companyName: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <input type="text" placeholder="Role" required value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <input type="date" required value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <textarea placeholder="Description" value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg"></textarea>
              <button type="submit" className="btn-primary w-full">Add Experience</button>
            </form>
          )}

          {activeTab === 'education' && (
            <form onSubmit={handleAddEdu} className="space-y-4">
              <input type="text" placeholder="Institution" required value={eduForm.institution} onChange={e => setEduForm({...eduForm, institution: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <input type="text" placeholder="Degree" required value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <input type="date" required value={eduForm.startDate} onChange={e => setEduForm({...eduForm, startDate: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded-lg" />
              <button type="submit" className="btn-primary w-full">Add Education</button>
            </form>
          )}
        </div>

        {/* LIST SECTION */}
        <div className="lg:col-span-2 bg-[#151515] p-6 rounded-2xl border border-border-subtle shadow-sm">
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loadingSkills ? <p>Loading...</p> : skills?.map(skill => (
                <div key={skill._id} className="flex justify-between items-center p-4 border border-border-subtle rounded-xl">
                  <div><p className="font-bold">{skill.name}</p><p className="text-xs text-text-secondary">{skill.category}</p></div>
                  <button onClick={() => deleteSkill(skill._id)} className="text-text-secondary hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              {loadingExp ? <p>Loading...</p> : experiences?.map(exp => (
                <div key={exp._id} className="flex justify-between items-start p-4 border border-border-subtle rounded-xl">
                  <div>
                    <p className="font-bold text-lg">{exp.companyName}</p>
                    <p className="text-accent font-medium text-sm">{exp.role}</p>
                    <p className="text-xs text-text-secondary mt-1">{new Date(exp.startDate).getFullYear()}</p>
                  </div>
                  <button onClick={() => deleteExperience(exp._id)} className="text-text-secondary hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'education' && (
            <div className="space-y-4">
              {loadingEdu ? <p>Loading...</p> : educations?.map(edu => (
                <div key={edu._id} className="flex justify-between items-start p-4 border border-border-subtle rounded-xl">
                  <div>
                    <p className="font-bold text-lg">{edu.institution}</p>
                    <p className="text-accent font-medium text-sm">{edu.degree}</p>
                    <p className="text-xs text-text-secondary mt-1">{new Date(edu.startDate).getFullYear()}</p>
                  </div>
                  <button onClick={() => deleteEducation(edu._id)} className="text-text-secondary hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
