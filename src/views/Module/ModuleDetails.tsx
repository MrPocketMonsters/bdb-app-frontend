import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleDetails, ModuleDetails as ModuleDetailsType } from '@/services/moduleService';
import { NAVIGATION_PATHS } from '@/constants/navigation';
import ListEntryCard from '@/components/ListEntryCard';

const ModuleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<ModuleDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      if (!id) {
        setError('ID de módulo no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getModuleDetails(Number(id));
        setModule(data);
      } catch (err) {
        console.error('Error fetching module details:', err);
        setError('No se pudo cargar la información del módulo');
      } finally {
        setLoading(false);
      }
    };

    fetchModuleDetails();
  }, [id]);

  const handleCourseClick = (courseId: string) => {
    // TODO: Navigate to course details page when implemented
    console.log('Course clicked:', courseId);
  };

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
          <p className="text-white/80">Cargando módulo...</p>
        </div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md bg-red-600/20 backdrop-blur-md border border-red-500/30 rounded-xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Error</h2>
          <p className="text-white/80 mb-6">{error || 'Módulo no encontrado'}</p>
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
      {/* Back button */}
      <button
        onClick={() => navigate(NAVIGATION_PATHS.HOME_PATH)}
        className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver
      </button>

      {/* Module header */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{module.name}</h1>
        {module.description && (
          <p className="text-xl text-white/90 leading-relaxed mb-4">
            {module.description}
          </p>
        )}
        {module.createdBy && (
          <p className="text-sm text-white/60">
            Creado por: <span className="text-white/80">{module.createdBy}</span>
          </p>
        )}
      </div>

      {/* Courses section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Cursos ({module.courses?.length || 0})
        </h2>
      </div>

      <div className="space-y-4">
        {!module.courses || module.courses.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8">
            <p className="text-white/70 text-center">
              No hay cursos disponibles en este módulo.
            </p>
          </div>
        ) : (
          module.courses.map((course) => (
            <ListEntryCard
              key={course.id}
              id={String(course.id)}
              title={course.name}
              onClick={handleCourseClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ModuleDetails;
