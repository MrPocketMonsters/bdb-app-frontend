import React, { useEffect } from "react";
import { logout } from '../../services/authService';
import RedirectTimer from "@/components/RedirectTimer";
import { NAVIGATION_PATHS } from "@/constants/navigation";

const Logout: React.FC = () => {
  // perform logout once on mount
  useEffect(() => {
    try {
      logout();
    } catch (e) {
      // ignore errors from logout, we'll still redirect
      // console.error(e);
    }
  }, []);

  return <RedirectTimer message="Has cerrado sesión correctamente. Serás redirigido en" redirectTo={NAVIGATION_PATHS.HOME_PATH} />;
};

export default Logout;
