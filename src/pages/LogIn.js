import styles from '../styles/login_signup.module.css';

const LogIn = () => {
  return (
    <form className={styles.login_signup_form}>
      <span className={styles.login_signup_header}>Log In</span>
      <input
        className={styles.input_field}
        type="email"
        placeholder="Email"
        required={true}
      />
      <input
        className={styles.input_field}
        type="password"
        placeholder="Password"
        required={true}
      />
      <button className={styles.btn}>Log In</button>
    </form>
  );
};

export default LogIn;
