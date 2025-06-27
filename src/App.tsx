import React, { useEffect, useRef, useState } from 'react';
import { IoLanguage } from "react-icons/io5";
import CardSwap, { Card } from './components/CardSwap.tsx';
import Contact from './components/Contact.tsx';
import './i18n.ts'
import { useTranslation } from 'react-i18next';
import LanguageToggle from './components/LanguageToggle.tsx';

import portfolioImg from './assets/projects/portfolio.jpg';
import switcherImg from './assets/projects/switcher.png';
import analysisImg from './assets/projects/analysis.png';
import networkImg from './assets/projects/network.png';

const App: React.FC = () => {
  const { t } = useTranslation()

  const handleCardClick = (cardIndex: number, repoUrl?: string) => {
    console.log(`Card ${cardIndex + 1} was clicked!`);
    if (repoUrl) {
      console.log(`Opening repository: ${repoUrl}`);
      // Repository will already be opened in new tab by the component
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ width: 450, height: 350 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {

        const containerWidth = containerRef.current.offsetWidth;

        const width = containerWidth <= 640 ? containerWidth * 0.75 : containerWidth * 0.7;
        const height = containerWidth <= 640 ? width * 1.15 : width * 0.75;
        console.log("Ancho actual: " + width)
        console.log("Alto actual: " + height)
        console.log("Tamaño de contenedor: " + containerWidth)

        setCardSize({
          width,
          height: height,
        });
      }
    };

    // Initial update
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Keep window resize as fallback
    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div className="mx-auto md:overflow-y-auto bg-custom-gradient relative z-0 w-full overflow-x-hidden min-h-screen">
      {/* Background animation */}
      <div className="gradient" />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

          {/* Left Column - Personal Info */}
          <div className="p-8 flex flex-col min-h-screen justify-center gap-8">
            <div className="font-mono text-[#EEEEFF] text-6xl antialiased">
              Facundo Mourelle
            </div>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg">
              {t('description')}
            </p>
            <div className="text-2xl font-semibold text-gray-200 mb-4">{t('contact')}</div>
            <div className="flex flex-wrap gap-4">
              <Contact />
            </div>
          </div>

          {/* Right Column - Projects & Language */}
          <div className="grid grid-rows-[auto_1fr] p-4 text-balance min-h-screen">
            {/* Language switch */}
            <div className="flex md:justify-end justify-center mb-4 md:mb-0">
              <IoLanguage className="md:w-8 md:h-8 h-auto w-auto text-gray-300 mr-2" />
              <LanguageToggle />
            </div>

            {/* Projects Component */}
            <div ref={containerRef} className="flex items-center md:items-end md:pb-32 pb-8 justify-center md:justify-start">
              <div className="relative max-w-[600px]">
                <CardSwap
                  className="w-full"
                  width={cardSize.width}
                  height={cardSize.height}
                  cardDistance={70}
                  verticalDistance={70}
                  delay={3000}
                  pauseOnHover={true}
                  onCardClick={handleCardClick}
                  skewAmount={4}
                  easing="elastic"
                >
                  <Card
                    customClass="bg-bone border-bone-dark outline-bone-dark"
                    repoUrl="https://github.com/yourusername/portfolio-website">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{t('portfolio-title')}</h3>
                    <div className="flex">
                      <p className="text-wrap text-gray-700 font-bold text-sm md:text-lg mb-2">
                        {t('portfolio-desc')}
                      </p>
                    </div>
                    <figure className="w-full flex justify-center rounded-md mb-4">
                      <img
                        src={portfolioImg}
                        alt="Portfolio screenshot"
                        className="md:w-4/5 md:h-auto rounded-md shadow-md"
                      ></img>
                    </figure>
                    <div className="hidden sm:inline-flex grid grid-cols-3 justify-center justify-items-center gap-4">
                      <div className="language-tag">
                        React</div>
                      <div className="language-tag">
                        TypeScript</div>
                      <div className="language-tag">
                        Tailwind</div>
                    </div>
                  </Card>

                  <Card
                    customClass="bg-wine border-wine-dark"
                    repoUrl="https://github.com/FacuMou/el-switcher"
                  >
                    <h3 className="text-xl font-bold text-bone mb-3">{t('switcher-title')}</h3>
                    <div className="flex">
                      <p className="text-wrap text-bone font-bold text-sm md:text-lg mb-2">
                        {t('switcher-desc')}
                      </p>
                    </div>
                    <figure className="w-full flex justify-center rounded-md mb-4">
                      <img
                        src={switcherImg}
                        alt="El Switcher"
                        className="md:w-4/5 md:h-auto rounded-md shadow-md"
                      ></img>
                    </figure>
                    <div className="hidden md:inline-flex grid grid-cols justify-center justify-items-center gap-4">
                      <div className="language-tag">
                        React</div>
                      <div className="language-tag">
                        Python</div>
                      <div className="language-tag">
                        SQLite</div>
                      <div className="language-tag">
                        FastAPI</div>
                    </div>
                  </Card>

                  <Card
                    customClass="bg-blueish border-slate-800"
                    repoUrl="https://github.com/FacuMou/el-switcher-refactor">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t('refactor-title')}</h3>

                    <div className="flex">
                      <p className="text-wrap text-gray-800 font-bold text-sm md:text-lg mb-2">
                        {t('refactor-desc')}
                      </p>
                    </div>
                    <figure className="w-full flex justify-center rounded-md mb-4">
                      <img
                        src={switcherImg}
                        alt="El Switcher refactored"
                        className="md:w-4/5 md:h-auto rounded-md shadow-md"
                      ></img>
                    </figure>
                    <div className="hidden sm:inline-flex grid grid-cols-3 justify-center justify-items-center gap-4">
                      <div className="language-tag">
                        React</div>
                      <div className="language-tag">
                        Springboot</div>
                      <div className="language-tag">
                        PostgreSQL</div>
                    </div>
                  </Card>

                  <Card
                    customClass="bg-forest border-forest-dark"
                    repoUrl="https://github.com/FacuMou/omnet-packet-routing"
                  >
                    <h3 className="text-xl font-bold text-bone mb-3">{t('omnet-title')}</h3>
                    <p className="text-wrap text-bone font-bold text-sm md:text-lg mb-2">
                      {t('omnet-desc')}
                    </p>
                    <figure className="w-full flex justify-center rounded-md gap-4 mb-4">
                      <img
                        src={networkImg}
                        alt="Omnet++ network"
                        className="md:w-4/5 md:h-auto self-center md:self-auto rounded-md shadow-md"
                      ></img>
                      <img
                        src={analysisImg}
                        alt="Graphic analysis"
                        className="hidden md:inline-flex md:w-4/5 md:h-auto rounded-md shadow-md"
                      ></img>
                    </figure>
                    <div className="hidden md:inline-flex grid grid-cols justify-center justify-items-center gap-4">
                      <div className="language-tag">
                        C++</div>
                      <div className="language-tag">
                        Omnet++</div>
                      <div className="language-tag">
                        MatPlotLib</div>
                    </div>
                  </Card>

                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
