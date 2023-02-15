import { useContext, useEffect, useState } from 'react';
import { getPosts } from '../api';
import { PostsContext } from '../providers/PostsProvider';

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
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

  const updatePost = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    updatePost,
  };
};
