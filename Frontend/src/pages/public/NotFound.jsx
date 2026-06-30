import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold tracking-tighter mb-4 text-border-subtle">404</h1>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Page not found</h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-secondary">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
