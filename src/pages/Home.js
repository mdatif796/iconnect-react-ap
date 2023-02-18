// import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { CreatePost, FriendsList, Loader } from '../components';
import { useAuth } from '../hooks';
import { usePosts } from '../hooks/postProviderHooks';
import Post from '../components/Post';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>

      {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
