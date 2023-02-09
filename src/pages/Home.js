// import PropTypes from 'prop-types';

import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Loader } from '../components';

const Home = () => {
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
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt="user-pic"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
                  alt="likes-icon"
                />
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3114/3114810.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            {post.comments.map((comment) => {
              return (
                <Comment key={`comment-${comment._id}`} comment={comment} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
