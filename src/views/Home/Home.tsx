import React from 'react';
import { Link } from 'react-router-dom';
import ListEntryCard from '@/components/ListEntryCard';

const modules = [
  {
    id: 'cloud',
    title: 'Cloud Computing',
    image: 'images/modules/cloud.jpg',
    description:
      'Aprende a desplegar y gestionar aplicaciones en la nube: provisionamiento de recursos, diseño de arquitecturas escalables, costos y seguridad. Incluye hands-on con servicios populares y despliegues reales.',
  },
  {
    id: 'backend',
    title: 'Backend y APIs',
    image: 'images/modules/backend.jpg',
    description:
      'Construye APIs robustas y seguras, modela bases de datos, optimiza consultas y diseña esquemas escalables. Incluye autenticación, autorización y prácticas de testing y observabilidad.',
  },
  {
    id: 'frontend',
    title: 'Frontend Interactivo',
    image: 'images/modules/frontend.jpg',
    description:
      'Desarrolla interfaces modernas con enfoque en accesibilidad, rendimiento y experiencia de usuario. Trabaja con componentes, gestión de estado y optimización para dispositivos móviles y desktop.',
  },
  {
    id: 'devops',
    title: 'DevOps y CI/CD',
    image: 'images/modules/devops.jpg',
    description:
      'Automatiza pipelines, integra pruebas, despliegues y monitorización. Aprende a usar herramientas de CI/CD, infra como código y prácticas de entrega continua en entornos reales.',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    image: 'images/modules/data.jpg',
    description:
      'Fundamentos de ingeniería de datos y análisis: ingestión, almacenamiento, limpieza y visualización. Cubre casos de uso para la toma de decisiones y métricas de producto.',
  },
  {
    id: 'security',
    title: 'Seguridad y Buenas Prácticas',
    image: 'images/modules/security.jpg',
    description:
      'Conceptos esenciales de seguridad: gestión de secretos, cifrado, hardening de aplicaciones y pruebas de penetración básicas. Buenas prácticas para proteger tus proyectos en producción.',
  },
];

const Home: React.FC = () => {

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
              to="/register"
              className="px-5 py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 font-medium shadow-md"
            >
              Únete ahora
            </Link>
            <Link
              to="/login"
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
          {modules.map((m) => (
            <ListEntryCard
              key={m.id}
              id={m.id}
              title={m.title}
              image={m.image}
              description={m.description}
              onClick={(id) => {
                // scroll to module anchor
                window.location.hash = `#${id}`;
              }}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default Home;
