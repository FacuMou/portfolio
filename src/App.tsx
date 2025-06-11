import React from 'react';
import { IconContext } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { IoLanguage } from "react-icons/io5";
import Projects from './components/Projects';
import './i18n.ts'
import i18n from './i18n.ts';

const App: React.FC = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/facundo-mourelle-283a17245',
      icon: <FaLinkedin className="w-6 h-6" />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/your-username',
      icon: <FaGithub className="w-6 h-6" />
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: <SiGmail className="w-6 h-6" />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex-row flex-no-wrap justify-center items-center space-x-4">
        <IconContext.Provider value={{ size: "1.7rem", className: "h-full self-center" }}>
          <IoLanguage />
        </IconContext.Provider>
        <button onClick={() => i18n.changeLanguage('en')} className="px-3 py-2">English</button>
        <button onClick={() => i18n.changeLanguage('es')} className="px-3 py-2">Español</button>
      </div>
      <div className="grid grid-cols-2 gap-2 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">

          {/* Left Side - Personal Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                Facundo Mourelle
              </h1>

              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg">
                Description about me as a passionate full-stack developer with expertise in modern web technologies.
                I love creating innovative solutions and bringing ideas to life through clean, efficient code.
                Always eager to learn new technologies and tackle challenging problems.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-200">Connect with me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                  >
                    {link.icon}
                    <span className="font-medium"> {link.name} </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Projects Carousel */}
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default App;
