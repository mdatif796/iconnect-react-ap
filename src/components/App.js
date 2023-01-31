import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home, LogIn } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      console.log('posts: ', posts);
      if (posts.success) {
        setPosts(posts.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
