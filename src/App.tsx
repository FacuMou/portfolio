import React from 'react';
import { IoLanguage } from "react-icons/io5";
import CardSwap, { Card } from './components/CardSwap.tsx';
import BgAnimation from './components/Background.tsx';
import Contact from './components/Contact.tsx';
import './i18n.ts'
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const handleCardClick = (cardIndex: number, repoUrl?: string) => {
    console.log(`Card ${cardIndex + 1} was clicked!`);
    if (repoUrl) {
      console.log(`Opening repository: ${repoUrl}`);
      // Repository will already be opened in new tab by the component
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Background color */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#0d1b2a] to-[#415a77] "> </div>
      {/* Background animation */}
      <BgAnimation />
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <main className="grid grid-cols-2 ">

          {/* Left Column - Personal Info */}
          <div className="">
            {/* Name */}
            <h1 className="font-mono text-[#EEEEFF] text-xl antialiased">
              Facundo Mourelle
            </h1>
            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg">
              {t('description')}
            </p>
            {/* Contact Section */}
            <h3 className="text-xl font-semibold text-gray-200">{t('contact')}</h3>
            <div className="flex flex-wrap gap-4">
              <Contact />
            </div>
          </div>

          {/* Right Column - Projects & Language */}
          <div className="grid grid-rows-[auto_1fr] h-screen">
            {/* Language switch */}
            <div className="flex">
              <IoLanguage className="ml-auto h-full w-auto text-gray-300" />
              <button
                onClick={toggleLanguage}
                className={"text-white"}
              >
                Idioma
              </button>
            </div>
            {/* Projects Component */}
            <div className="flex items-center justify-center">
              <div style={{ height: '0px', position: 'relative' }}>
                <CardSwap
                  width={450}
                  height={300}
                  cardDistance={70}
                  verticalDistance={100}
                  delay={4000}
                  pauseOnHover={true}
                  onCardClick={handleCardClick}
                  skewAmount={4}
                  easing="elastic"
                >
                  <Card repoUrl="https://github.com/yourusername/portfolio-website">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Portfolio Website</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Personal portfolio built with React, TypeScript, and Tailwind CSS.
                    </p>
                    <div className="text-xs text-gray-500">React • TypeScript • Tailwind</div>
                  </Card>

                  <Card
                    customClass="bg-blue-50 border-blue-200"
                    repoUrl="https://github.com/yourusername/ecommerce-platform"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-3">E-commerce Platform</h3>
                    <p className="text-blue-600 text-sm mb-2">
                      Full-stack e-commerce solution with payment integration.
                    </p>
                    <div className="text-xs text-blue-500">Node.js • MongoDB • Stripe</div>
                  </Card>

                  <Card
                    customClass="bg-green-50 border-green-200"
                    repoUrl="https://github.com/yourusername/task-management-app"
                  >
                    <h3 className="text-xl font-bold text-green-800 mb-3">Task Manager</h3>
                    <p className="text-green-600 text-sm mb-2">
                      Collaborative task management with real-time updates.
                    </p>
                    <div className="text-xs text-green-500">React • Socket.io • PostgreSQL</div>
                  </Card>

                  <Card
                    customClass="bg-purple-50 border-purple-200"
                    repoUrl="https://github.com/yourusername/ai-chatbot"
                  >
                    <h3 className="text-xl font-bold text-purple-800 mb-3">AI Chatbot</h3>
                    <p className="text-purple-600 text-sm mb-2">
                      Intelligent chatbot with natural language processing.
                    </p>
                    <div className="text-xs text-purple-500">Python • OpenAI • FastAPI</div>
                  </Card>

                  <Card
                    customClass="bg-orange-50 border-orange-200"
                    repoUrl="https://github.com/yourusername/weather-dashboard"
                  >
                    <h3 className="text-xl font-bold text-orange-800 mb-3">Weather Dashboard</h3>
                    <p className="text-orange-600 text-sm mb-2">
                      Real-time weather data visualization and forecasting.
                    </p>
                    <div className="text-xs text-orange-500">Vue.js • Chart.js • Weather API</div>
                  </Card>
                </CardSwap>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
