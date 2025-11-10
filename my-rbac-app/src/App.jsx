import React, { useState, useEffect, useCallback } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const API_BASE_URL = 'http://localhost:3001/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Auth & State Management ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    if (token && role && userId) {
      const currentUser = { token, role, userId };
      setUser(currentUser);
      fetchPosts(currentUser);
    }
  }, []);

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        const currentUser = { token: data.token, role: data.role, userId: data.userId };
        setUser(currentUser);
        setMessage(`Welcome, ${data.role}!`);
        fetchPosts(currentUser);
      } else {
        setMessage(`Login Failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setPosts([]);
    setMessage('Logged out.');
  };

  // --- Data Actions ---
  const fetchPosts = useCallback(async (currentUser) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        headers: { 'Authorization': `Bearer ${currentUser.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setMessage(`Loaded ${data.posts.length} posts.`);
      } else {
        setMessage(`Access Denied: ${data.message}`);
        setPosts([]);
      }
    } catch (error) {
      setMessage('Error fetching posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify({ title: `New Post ${Date.now()}`, content: `Content by ${user.role}` })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Post created!');
        fetchPosts(user);
      } else {
        setMessage(`Create Failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) setMessage(`ADMIN SUCCESS: ${data.totalUsers} users found.`);
      else setMessage(`ADMIN DENIED (403): ${data.message}`);
    } catch(error) { setMessage('Admin check error.'); }
    finally { setLoading(false); }
  }

  const handleUpdatePost = async (postId, currentUser) => {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}` },
        body: JSON.stringify({ title: `UPDATED: ${new Date().toLocaleTimeString()}` })
    });
    if (res.ok) alert(`SUCCESS: Post ${postId} updated!`);
    else if (res.status === 403) alert(`FORBIDDEN (403): You don't own this post.`);
    else alert('Update failed.');
    fetchPosts(currentUser); // Refresh list to show update
  }

  // --- Main Render ---
  if (!user) {
    return <Login loginForm={loginForm} handleChange={handleLoginChange} handleLogin={handleLogin} loading={loading} message={message} />;
  }

  return <Dashboard user={user} posts={posts} loading={loading} message={message} handleLogout={handleLogout} handleCreatePost={handleCreatePost} handleAdminCheck={handleAdminCheck} fetchPosts={fetchPosts} handleUpdatePost={handleUpdatePost} />;
};

export default App;