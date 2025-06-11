import React, { useState, useEffect } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  languages: string[];
}

interface ProjectsProps {
  className?: string;
}

const Projects: React.FC<ProjectsProps> = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "El Switcher",
      description: "Un juego ",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      languages: ["React", "Python", "Node.js", "SQLite"]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Un juego ",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      languages: ["Vue.js", "Python", "Django", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Un juego ",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      languages: ["JavaScript", "React", "API Integration", "CSS"]
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Un juego ",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      languages: ["Python", "Data Analysis", "Chart.js", "Flask"]
    }
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div className={`space-y-6`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Mis proyectos
      </h2>

      <div className="relative">
        {/* Project Image Container */}
        <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <img
            src={projects[currentProjectIndex].image}
            alt={projects[currentProjectIndex].title}
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />

          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-2xl font-bold mb-3 text-white">
              {projects[currentProjectIndex].title}
            </h3>

            {/* Languages/Technologies */}
            <div className="flex flex-wrap gap-2">
              {projects[currentProjectIndex].languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProjectIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentProjectIndex
                ? 'bg-blue-400 scale-125'
                : 'bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>

        {/* Project Counter */}
        <div className="text-center mt-4 text-gray-400">
          <span className="text-sm">
            {currentProjectIndex + 1} of {projects.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
