import React from 'react';
import { Lock, PlusCircle, Globe } from 'lucide-react';
import Header from '../components/Header';
import MessageBar from '../components/MessageBar';
import PostCard from '../components/PostCard';
import PermissionGate, { ROLES } from '../components/PermissionGate';

const Dashboard = ({ user, posts, loading, message, handleLogout, handleCreatePost, handleAdminCheck, fetchPosts, handleUpdatePost }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <Header user={user} handleLogout={handleLogout} />

      <main className="max-w-4xl mx-auto">
        <MessageBar message={message} loading={loading} />

        {/* Action Bar with Route Guards */}
        <div className="flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow mb-6">
          
          <PermissionGate requiredRole={ROLES.EDITOR} userRole={user.role}>
            <button onClick={handleCreatePost} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50">
              <PlusCircle size={18} /> <span>Create Post</span>
            </button>
          </PermissionGate>
          
          <PermissionGate requiredRole={ROLES.ADMIN} userRole={user.role}>
            <button onClick={handleAdminCheck} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition disabled:opacity-50">
              <Lock size={18} /> <span>Admin Panel</span>
            </button>
          </PermissionGate>

          <PermissionGate requiredRole={ROLES.VIEWER} userRole={user.role}>
            <button onClick={() => fetchPosts(user)} disabled={loading} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50">
              <Globe size={18} /> <span>Refresh Posts</span>
            </button>
          </PermissionGate>
        </div>

        {/* Content Area */}
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Content List</h2>
        <p className="text-sm text-gray-500 mb-4">
            {user.role === ROLES.EDITOR ? 'You see published posts + your own drafts.' : 'You see all published posts.'}
        </p>
        
        <div className="space-y-4">
          {posts.length === 0 && !loading && (
              <div className="p-4 bg-white rounded-lg text-gray-500 text-center">No posts available.</div>
          )}
          {posts.map(post => (
            <PostCard key={post.id} post={post} user={user} handleUpdate={handleUpdatePost} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;