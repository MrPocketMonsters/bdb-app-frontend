import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface RedirectTimerProps {
  message: string;
  redirectTo?: string;
  initialCount?: number;
}

const RedirectTimer: React.FC<RedirectTimerProps> = ({ 
  message, 
  redirectTo = '/', 
  initialCount = 5 
}) => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(initialCount);

  // countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // navigate when countdown reaches 0
  useEffect(() => {
    if (count <= 0) {
      navigate(redirectTo);
    }
  }, [count, navigate, redirectTo]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <svg className="h-7 w-7 text-white animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">Redirigiendo…</h2>
        <p className="text-sm text-white/80 mb-6">
          {message} <span className="font-medium text-white">{count}</span> segundos.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to={redirectTo}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:scale-[1.01] transition-transform shadow-md"
          >
            Ir ahora
          </Link>

          <button
            onClick={() => navigate(redirectTo)}
            className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:bg-white/6"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectTimer;
