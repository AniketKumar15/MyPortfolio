import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import TargetCursor from './components/TargetCursor';
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogListAdmin = lazy(() => import('./pages/admin/BlogListAdmin'));
const BlogCreate = lazy(() => import('./pages/admin/BlogCreate'));
const CategoryManager = lazy(() => import('./pages/admin/CategoryManager'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const ProjectsManager = lazy(() => import('./pages/admin/ProjectsManager'));
const ResumeBuilder = lazy(() => import('./pages/admin/ResumeBuilder'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

// Public Pages
import Home from './pages/public/Home';
import ProjectsList from './pages/public/ProjectsList';
import SingleProject from './pages/public/SingleProject';
import BlogList from './pages/public/BlogList';
import SingleBlog from './pages/public/SingleBlog';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import Disclaimer from './pages/public/Disclaimer';
import NotFound from './pages/public/NotFound';

import { Toaster } from 'react-hot-toast';


// Simple PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Toaster position="top-right" />

        <ScrollToTop />
        {/* <TargetCursor 
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          targetSelector="a, button, .cursor-target"
        /> */}
        <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary transition-colors duration-300">
          {/* Public Routes with Navbar and Footer */}
          <Routes>
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<ProjectsList />} />
                    <Route path="/projects/:slug" element={<SingleProject />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<SingleBlog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
            
            {/* Admin Login (No Layout) */}
            <Route path="/admin/login" element={
              <Suspense fallback={<div className="flex h-screen items-center justify-center bg-bg-primary text-white">Loading...</div>}>
                <AdminLogin />
              </Suspense>
            } />

            {/* Admin Routes with Layout (Protected) */}
            <Route path="/admin" element={
              <PrivateRoute>
                <Suspense fallback={<div className="flex h-screen items-center justify-center bg-bg-primary text-white">Loading Admin...</div>}>
                  <AdminLayout />
                </Suspense>
              </PrivateRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="blogs" element={<BlogListAdmin />} />
              <Route path="blogs/create" element={<BlogCreate />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>

      </Router>
    </HelmetProvider>
  );
}

export default App;
