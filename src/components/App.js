import { Home, LogIn, Settings } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';
import SignUp from '../pages/SignUp';
import Page404 from '../pages/404';

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
