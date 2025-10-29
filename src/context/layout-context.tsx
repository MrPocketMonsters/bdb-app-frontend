import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/services/authService';
import { getSub } from '@/services/jwtService';
import { getUserByEmail } from '@/services/userService';
import { NAVIGATION_PATHS } from '@/constants/navigation';

type LayoutContextType = {};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (ctx === undefined) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return ctx;
};

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const logged = isLoggedIn()
      console.log("LayoutProvider - isLoggedIn:", logged);
      if (logged) {
        setIsAuthenticated(true);
        const email = getSub();
        
        if (email) {
          try {
            const response = await getUserByEmail(email);
            setUserName(response.name);
            setUserId(response.id.toString());
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUserName(null);
        setUserId(null);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleUserClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const handleLogout = () => {
    navigate(NAVIGATION_PATHS.LOGOUT_PATH);
  };

  const handleTitleClick = () => {
    navigate(NAVIGATION_PATHS.HOME_PATH);
  };

  // No state for now — this provider mainly renders header/footer around the app
  return (
    <LayoutContext.Provider value={{}}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <header className="backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 
              onClick={handleTitleClick}
              className="text-xl font-semibold cursor-pointer hover:opacity-80 transition-opacity"
            >
              Portal de Capacitaciones
            </h1>
            <nav className="flex items-center gap-3">
              {isAuthenticated && userName ? (
                <>
                  <button
                    onClick={handleUserClick}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:scale-[1.01] transition-transform"
                  >
                    {userName}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md border border-white/20 text-white/90 hover:bg-white/5"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={NAVIGATION_PATHS.REGISTER_PATH}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md"
                  >
                    Únete
                  </Link>
                  <Link
                    to={NAVIGATION_PATHS.LOGIN_PATH}
                    className="px-4 py-2 rounded-md border border-white/20 text-white/90 hover:bg-white/5"
                  >
                    ¿Tienes una cuenta?
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-20">{children}</main>

        <footer className="border-t border-white/10 mt-12 py-6">
          <div className="max-w-6xl mx-auto px-6 text-white/80 text-sm">
            © {new Date().getFullYear()} Portal de Capacitaciones — Comparte tus logros y crece profesionalmente.
          </div>
        </footer>
      </div>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
