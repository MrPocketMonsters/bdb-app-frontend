import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

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
  // No state for now — this provider mainly renders header/footer around the app
  return (
    <LayoutContext.Provider value={{}}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <header className="backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Portal de Capacitaciones</h1>
            <nav className="flex items-center gap-3">
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md"
              >
                Únete
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md border border-white/20 text-white/90 hover:bg-white/5"
              >
                ¿Tienes una cuenta?
              </Link>
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
