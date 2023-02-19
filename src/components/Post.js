import Comment from './Comment';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../hooks/postProviderHooks';
import { toast } from 'react-toastify';
import { addComment, listOfLikes, toggleLikeFun } from '../api';
import { useAuth } from '../hooks';

const Post = ({ post }) => {
  const [commentState, setCommentState] = useState('');

  const posts = usePosts();
  const auth = useAuth();

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (commentState.length === 0) {
        toast.error('Comment content is empty');
        return;
      }

      const response = await addComment(post._id, commentState);

      if (response.success) {
        posts.addCommentToState(post._id, response.data.comment);
        setCommentState('');
        toast.success('comment added');
      } else {
        toast.error(response.message);
      }
      return;
    }
  };

  const handleToggleLikeBtn = async () => {
    console.log('POSTLIKE', posts);
    const response = await toggleLikeFun(post._id, 'Post');
    // const likes = await listOfLikes(post._id, 'Post');
    // console.log('likes ', likes);

    if (response.success) {
      if (response.data.deleted) {
        toast.success('Like removed successfully');
      } else {
        toast.success('Like added successfully');
      }
    } else {
      toast.error(response.message);
    }
    return;
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="user-pic"
          />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <img
              onClick={handleToggleLikeBtn}
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
        {auth.user && (
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              type="search"
              onChange={(e) => setCommentState(e.target.value)}
              value={commentState}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {post.comments.map((comment) => {
          return <Comment key={`comment-${comment._id}`} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Post;
