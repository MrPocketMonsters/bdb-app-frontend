import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, register } from "@/services/authService";
import RedirectTimer from "@/components/RedirectTimer";
import { NAVIGATION_PATHS } from "@/constants/navigation";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setIsAlreadyLoggedIn(true);
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await register(email, password, name);
      setSuccess(true);
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate(NAVIGATION_PATHS.LOGIN_PATH);
      }, 3000);
    } catch (error: any) {
      setError(`Error: ${error.message}`);
      console.error("Error de solicitud:", error);
    }
  };

  // Show redirect message if already logged in
  if (isAlreadyLoggedIn) {
    return <RedirectTimer message="Ya has iniciado sesión. Serás redirigido en" redirectTo={NAVIGATION_PATHS.HOME_PATH} />;
  }

  // Show success message
  if (success) {
    return (
      <div className="flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md bg-green-600/20 backdrop-blur-md border border-green-500/30 rounded-xl shadow-xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">¡Registro exitoso!</h2>
          <p className="text-white/80 mb-6">
            Tu cuenta ha sido creada correctamente. Serás redirigido al inicio de sesión en unos segundos.
          </p>
          <Link
            to={NAVIGATION_PATHS.LOGIN_PATH}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:scale-[1.01] transition-transform shadow-md inline-block"
          >
            Ir ahora
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Crear Cuenta</h2>

        {error && (
          <div className="mb-4 bg-red-600/90 text-white text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/6 border border-white/20 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

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
              minLength={6}
              className="w-full bg-white/6 border border-white/20 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/6 border border-white/20 text-gray-900 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:scale-[1.01] transition-transform shadow-md"
            >
              Registrarse
            </button>
          </div>

          <div className="text-center text-sm text-white/80">
            <p>
              ¿Ya tienes cuenta?{" "}
              <Link to={NAVIGATION_PATHS.LOGIN_PATH} className="text-blue-200 underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
