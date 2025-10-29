import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isLoggedIn } from '@/services/authService';
import { getUserById } from '@/services/userService';
import { getUserHistoryByUserId, getAllUserRecognitionsByUserId, UserHistoryEntry, UserRecognitionEntry } from '@/services/userHistoryService';
import ListEntryCard from '@/components/ListEntryCard';
import { NAVIGATION_PATHS } from '@/constants/navigation';

interface UserData {
  id: number;
  email: string;
  name: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userHistory, setUserHistory] = useState<UserHistoryEntry[]>([]);
  const [userRecognitions, setUserRecognitions] = useState<UserRecognitionEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in
        if (!isLoggedIn()) {
          navigate(NAVIGATION_PATHS.LOGIN_PATH);
          return;
        }

        // Check if ID is provided
        if (!id) {
          setError('No se proporcionó un ID de usuario');
          setLoading(false);
          return;
        }

        // Fetch user data by ID
        const user = await getUserById(id);
        setUserData(user);

        // Fetch user history and recognitions by user ID
        const [history, recognitions] = await Promise.all([
          getUserHistoryByUserId(id),
          getAllUserRecognitionsByUserId(id)
        ]);

        setUserHistory(history);
        setUserRecognitions(recognitions);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Error al cargar la información del usuario');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-white animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
          <p className="text-white/80">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md bg-red-600/20 backdrop-blur-md border border-red-500/30 rounded-xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Error</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={() => navigate(NAVIGATION_PATHS.HOME_PATH)}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:scale-[1.01] transition-transform shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* User Info Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8 mb-6">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white">
            {userData?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">{userData?.name}</h1>
            <p className="text-white/70 text-lg">{userData?.email}</p>
          </div>
        </div>
      </div>

      {/* User History Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Historial de Cursos</h2>
        {userHistory.length > 0 ? (
          <div className="space-y-4">
            {userHistory.map((entry) => (
              <ListEntryCard
                key={entry.id}
                id={entry.id.toString()}
                title={`Curso ${entry.courseId}`}
                description={`Orden: ${entry.order}`}
                date={entry.startedAt}
                onClick={(id) => {
                  console.log('Clicked on history entry:', id);
                  // TODO: Navigate to course details
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
            <p className="text-white/70 text-center">No tienes cursos en tu historial</p>
          </div>
        )}
      </div>

      {/* User Recognitions Section */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Reconocimientos</h2>
        {userRecognitions.length > 0 ? (
          <div className="space-y-4">
            {userRecognitions.map((entry) => (
              <ListEntryCard
                key={entry.id}
                id={entry.id.toString()}
                title={entry.courseName}
                description={`Curso ID: ${entry.courseId}`}
                date={entry.createdAt}
                onClick={(id) => {
                  console.log('Clicked on recognition:', id);
                  // TODO: Navigate to course details or show certificate
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
            <p className="text-white/70 text-center">No tienes reconocimientos aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
