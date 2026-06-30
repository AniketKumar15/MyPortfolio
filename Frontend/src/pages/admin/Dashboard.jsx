import { FileText, Users, Eye, ArrowUpRight } from 'lucide-react';
import { useGetAdminBlogsQuery } from '../../store/apiSlice';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { data: blogs, isLoading, error } = useGetAdminBlogsQuery();

  if (isLoading) return <div className="py-12">Loading dashboard data...</div>;
  if (error) return <div className="py-12 text-red-500">Failed to load dashboard data.</div>;

  const totalPosts = blogs?.length || 0;
  const totalViews = blogs?.reduce((acc, blog) => acc + (blog.views || 0), 0) || 0;
  // Subscribers model isn't fully implemented yet, showing 0 for now as requested (no mock data).
  const totalSubscribers = 0; 

  const stats = [
    { title: 'Total Posts', value: totalPosts, icon: FileText, trend: 'All time' },
    { title: 'Subscribers', value: totalSubscribers, icon: Users, trend: 'Database empty' },
    { title: 'Page Views', value: totalViews, icon: Eye, trend: 'Across all posts' },
  ];

  const recentPosts = blogs?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-text-secondary">Track your publication's performance.</p>
      </div>

      {/* Stats Grid - Vercel style cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#151515] p-6 border border-border-subtle rounded-xl flex flex-col shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">{stat.title}</span>
                <Icon className="w-4 h-4 text-text-secondary" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-2">{stat.value}</h3>
              <div className="flex items-center text-xs font-medium text-text-secondary">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#151515] border border-border-subtle rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center">
          <h3 className="font-semibold">Recent Posts</h3>
          <Link to="/admin/blogs" className="text-sm text-text-secondary hover:text-accent">View all</Link>
        </div>
        
        {recentPosts.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No posts found in the database. 
            <br />
            <Link to="/admin/blogs" className="text-accent hover:underline mt-2 inline-block">Create your first post.</Link>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {recentPosts.map((blog) => (
              <div key={blog._id} className="px-6 py-4 flex items-center justify-between hover:bg-bg-secondary transition-colors">
                <div>
                  <p className="font-medium text-sm mb-1">{blog.title}</p>
                  <p className="text-xs text-text-secondary">
                    {blog.status === 'published' ? 'Published' : 'Draft'} • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                    {blog.category?.name || 'Uncategorized'}
                  </span>
                  <span className="text-xs text-text-secondary">{blog.views || 0} views</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
