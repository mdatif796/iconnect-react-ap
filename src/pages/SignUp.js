import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import styles from '../styles/login_signup.module.css';

import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  const auth = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // navigate('/login');
    e.preventDefault();
    setSigningUp(true);
    if (!email || !password || !name || !confirmPassword) {
      toast.error('Enter all the fields');
      setSigningUp(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password and confirm password does not match');
      setSigningUp(false);
      return;
    }

    const response = await auth.signup(email, name, password, confirmPassword);
    console.log('response: ', response);
    if (response.success) {
      toast.success('successfully sign up');
      navigate('/login');
    } else {
      toast.error(response.message);
    }

    setSigningUp(false);
    return;
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.login_signup_form} onSubmit={handleSubmit}>
      <span className={styles.login_signup_header}>Sign Up</span>
      <input
        className={styles.input_field}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        className={styles.input_field}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className={styles.input_field}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <input
        className={styles.input_field}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button className={styles.btn} disabled={signingUp}>
        {signingUp ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUp;
