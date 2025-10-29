import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useTheme } from './context/theme-provider';
import { NAVIGATION_PATHS } from './constants/navigation';

import Home from './views/Home/Home';
import Login from './views/Auth/Login';
import Logout from './views/Auth/Logout';
import Register from './views/Auth/Register';
import Profile from './views/User/Profile';

function App() {
  const { theme } = useTheme();

  // Add or remove the 'dark-mode' class based on the selected theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <>
      <Routes>
        <Route element={`${/* Insert Navbar */ ''}`}>
          <Route index path={NAVIGATION_PATHS.HOME_PATH} element={<Home />} />
          <Route path={NAVIGATION_PATHS.LOGIN_PATH} element={<Login />} />
          <Route path={NAVIGATION_PATHS.LOGOUT_PATH} element={<Logout />} />
          <Route path={NAVIGATION_PATHS.REGISTER_PATH} element={<Register />} />
          <Route path={`${NAVIGATION_PATHS.PROFILE_PATH}/:id`} element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
