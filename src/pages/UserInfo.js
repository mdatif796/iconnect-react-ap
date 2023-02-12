import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFriendship, fetchUserFriends, userProfileInfo } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const UserInfo = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [sendFriendRequest, setSendFriendRequest] = useState(false);

  const auth = useAuth();
  console.log(auth);
  const { userId } = useParams();

  const setFriend = async () => {
    const userFriends = await user?.friends;
    console.log('userFriends: ', userFriends);

    if (userFriends?.length > 0) {
      for (let i = 0; i < userFriends.length; i++) {
        console.log('for loop');
        if (userFriends[i].to_user._id === userId) {
          console.log(
            'userFriends[i].to_user._id: ',
            userFriends[i].to_user._id,
            userId
          );

          setIsFriend(true);

          break;
        }
      }
    }
  };

  const handleAddFriend = async () => {
    setSendFriendRequest(true);

    const response = await createFriendship(user._id);
    console.log('response-add: ', response);

    if (response.success) {
      toast.success('Friends Added!!', {
        position: 'top-left',
      });

      await auth.user.friendships.push(response.data.friendship);
      console.log('response.data.friendships: ', response.data.friendships);

      setIsFriend(true);
    } else {
      toast.error(response.message, {
        position: 'top-left',
      });
    }

    setSendFriendRequest(false);
    return;
  };

  setFriend();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await userProfileInfo(userId);
      console.log('response7: ', response);

      if (response.success) {
        let userFetched = await response.data.user;

        const fetchUserFriendsResponse = await fetchUserFriends();

        if (fetchUserFriendsResponse.success) {
          userFetched.friends = await fetchUserFriendsResponse.data.friends;
          setUser(userFetched);
          console.log('userFetched: ', userFetched);
        }
      } else {
        toast.error(response.message, {
          position: 'top-left',
        });
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
        {isFriend ? (
          <button className={`button ${styles.editBtn}`}>Remove Friend</button>
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
