import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { Navigate } from 'react-router-dom';

const Settings = () => {
  const auth = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const handleFormClick = () => {
    setEditMode(true);
  };

  const handleBackBtn = () => {
    setEditMode(false);
  };

  const handleFormSave = async () => {
    setSavingForm(true);
    if (!name || !password || !confirmPassword) {
      toast.error('Enter all the fields');
      // setEditMode(false);
      setSavingForm(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password and confirm password does not match');
      // setEditMode(false);
      setSavingForm(false);
      return;
    }

    const response = await auth.edituser(
      auth.user._id,
      password,
      confirmPassword,
      name
    );
    console.log('response: ', response);
    if (response.success) {
      toast.success('successfully profile updated');
    } else {
      toast.error(response.message);
    }

    setEditMode(false);
    setSavingForm(false);
    return;
  };

  // if (!auth.user) {
  //   return <Navigate to="/" />;
  // }

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <div>
            <>
              <button
                className={`button ${styles.editBtn}`}
                onClick={handleFormSave}
                disabled={savingForm}
              >
                {savingForm ? 'Saving...' : 'Save'}
              </button>
              <button
                className={`button ${styles.editBtn}`}
                onClick={handleBackBtn}
              >
                Go Back
              </button>
            </>
          </div>
        ) : (
          <>
            <button
              className={`button ${styles.editBtn}`}
              onClick={handleFormClick}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
