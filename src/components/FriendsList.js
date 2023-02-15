import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendsList = () => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friendships && friendships.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}

      {friendships &&
        friendships.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link
              className={styles.friendsItem}
              to={`/user/${friend.to_user._id}`}
            >
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.name}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
