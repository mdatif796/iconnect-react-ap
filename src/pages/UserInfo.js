import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFriendship, removeFriendApi, userProfileInfo } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const UserInfo = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendFriendRequest, setSendFriendRequest] = useState(false);
  const [removeFriend, setRemoveFriend] = useState(false);

  const auth = useAuth();
  console.log(auth);
  const { userId } = useParams();

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleAddFriend = async () => {
    setSendFriendRequest(true);

    const response = await createFriendship(userId);
    console.log('response-add: ', response);

    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);

      toast.success('Friends Added!!');
    } else {
      toast.error(response.message);
    }

    setSendFriendRequest(false);
    return;
  };

  const handleRemoveFriend = async () => {
    setRemoveFriend(true);
    const response = await removeFriendApi(userId);
    console.log('response: ', response);

    if (response.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);

      toast.success('Friends Removed!!');
    } else {
      toast.error(response.message);
    }
    setRemoveFriend(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await userProfileInfo(userId);
      console.log('response7: ', response);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        return navigate('/');
      }
      setLoading(false);
    };

    getUserInfo();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.editBtn}`}
            onClick={handleRemoveFriend}
            disabled={removeFriend}
          >
            {removeFriend ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={handleAddFriend}
            disabled={sendFriendRequest}
          >
            {sendFriendRequest ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
