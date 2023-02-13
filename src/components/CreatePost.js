import { useState } from 'react';
import { toast } from 'react-toastify';
import { addPost } from '../api';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const handleAddPost = async () => {
    setAddingPost(true);

    if (post.length === 0) {
      toast.error('Post content is empty', {
        position: 'top-left',
      });
      setAddingPost(false);
      return;
    }

    const response = await addPost(post);

    if (response.success) {
      setPost('');
      toast.success('Post added', {
        position: 'top-left',
      });
    } else {
      console.log(response);
      toast.error(response.message, {
        position: 'top-left',
      });
    }

    setAddingPost(false);
    return;
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPost}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
