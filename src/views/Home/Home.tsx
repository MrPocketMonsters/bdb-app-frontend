import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListEntryCard from '@/components/ListEntryCard';
import { NAVIGATION_PATHS } from '@/constants/navigation';
import { getModuleList, PaginatedModulesResponse } from '@/services/moduleService';

interface Module {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Fetch first page with 20 items
        const response: PaginatedModulesResponse = await getModuleList(0, 20);
        setModules(response.content);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching modules:', err);
        setError(err.message || 'Error al cargar los módulos');
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <>
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Aprende. Mejora. Comparte tus logros.</h2>
          <p className="text-white/90 text-lg md:text-xl mb-6">
            Toma cursos prácticos organizados en módulos especializados. Avanza a tu ritmo, completa
            retos y comparte tus badges con tu red profesional.
          </p>

          <div className="flex gap-3">
            <Link
              to={NAVIGATION_PATHS.REGISTER_PATH}
              className="px-5 py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-medium shadow-md"
            >
              Únete ahora
            </Link>
            <Link
              to={NAVIGATION_PATHS.LOGIN_PATH}
              className="px-5 py-3 rounded-md border border-white/20 text-white/90 hover:bg-white/5 flex items-center"
            >
              ¿Tienes una cuenta?
            </Link>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-72 md:h-96 bg-white/5 rounded-xl p-6 shadow-xl flex items-center justify-center">
            <img src="images/student.jpg" alt="Estudiante" className="object-cover rounded-md" />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl text-white shadow-lg mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Cómo funciona</h3>
            <p className="text-white/90 mb-6 text-lg">
              Sigue un proceso simple: explora módulos, escoge un curso, realiza ejercicios prácticos y obtén
              reconocimientos que podrás mostrar al terminar un curso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">1</div>
                  <div>
                    <div className="font-semibold">Elige un módulo</div>
                    <div className="text-sm text-white/80">Explora temarios y selecciona tu ruta.</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">2</div>
                  <div>
                    <div className="font-semibold">Aprende con práctica</div>
                    <div className="text-sm text-white/80">Lecciones y retos para consolidar conocimientos.</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">3</div>
                  <div>
                    <div className="font-semibold">Obtén reconocimiento</div>
                    <div className="text-sm text-white/80">Comparte que has terminado un curso.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="modules" className="space-y-5">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-white text-lg font-semibold mb-2">
                Error al cargar los módulos
              </p>
              <p className="text-white/80">{error}</p>
            </div>
          ) : modules.length === 0 ? (
            <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/50 rounded-lg p-6 text-center">
              <p className="text-white text-lg">
                No hay módulos disponibles en este momento.
              </p>
            </div>
          ) : (
            modules.map((m) => (
              <ListEntryCard
                key={m.id}
                id={String(m.id)}
                title={m.name}
                onClick={(id) => {
                  navigate(`${NAVIGATION_PATHS.MODULE_DETAILS_PATH}/${id}`);
                }}
              />
            ))
          )}
        </section>
      </section>
    </>
  );
};

export default Home;
