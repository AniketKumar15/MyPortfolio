import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/apiSlice';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please enter all fields');
    }

    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem('token', res.token);
      toast.success('Login successful');
      // Force a full reload to re-initialize the API slice with the new token
      window.location.href = '/admin';
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4">
      <div className="max-w-md w-full bg-[#151515] p-8 rounded-2xl border border-border-subtle shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-accent">Admin Portal</h2>
          <p className="text-sm text-text-secondary mt-2">Sign in to manage your publication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-accent bg-bg-secondary transition-colors"
              placeholder="admin@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-accent bg-bg-secondary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
