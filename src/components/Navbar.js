import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { getSearchUser } from '../api';

const Navbar = () => {
  const [searchUser, setSearchUser] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getSearchUser(searchText);
      if (response.success) {
        setSearchUser(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setSearchUser([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Search here..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {searchUser.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {searchUser.map((user) => {
                return (
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                    // onClick={() => setSearchText('')}
                  >
                    <Link to={`/user/${user._id}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt=""
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
