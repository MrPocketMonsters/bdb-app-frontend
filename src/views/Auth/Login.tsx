import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from '../../services/authService';
import { login } from "@/services/authService";
import RedirectTimer from "@/components/RedirectTimer";
import { NAVIGATION_PATHS } from "@/constants/navigation";

const Login: React.FC = () => {
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setIsAlreadyLoggedIn(true);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      await login(email, password);
      setIsAlreadyLoggedIn(true);
    } catch (error: any) {
      setError(`Error: ${error.message}`);
      console.error("Error de solicitud:", error);
    }
  };

  // Show redirect message if already logged in
  if (isAlreadyLoggedIn) {
    return <RedirectTimer message="Ya has iniciado sesión. Serás redirigido en" redirectTo={NAVIGATION_PATHS.HOME_PATH} />;
  }

  return (
    <div className="flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Iniciar Sesión</h2>

        {error && (
          <div className="mb-4 bg-red-600/90 text-white text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/6 border border-white/20 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/6 border border-white/20 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:scale-[1.01] transition-transform shadow-md"
            >
              Entrar
            </button>
          </div>

          <div className="text-center text-sm text-white/80">
            <p>
              ¿No tienes cuenta?{" "}
              <Link to={NAVIGATION_PATHS.REGISTER_PATH} className="text-blue-200 underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
