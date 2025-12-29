
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRAIN_SVG = `data:image/svg+xml,%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

const MetaData: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex justify-between font-mono text-[0.75rem] tracking-[0.2rem] text-bronze-metallic uppercase opacity-0 animate-fade-in">
    {children}
  </div>
);

const App: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [textShadow, setTextShadow] = useState('0px 0px 15px rgba(114, 255, 255, 0.1)');
  const frameRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    setRotation({
      x: -y * 0.2,
      y: x * 0.2,
    });
    
    setTextShadow(`${-x}px ${-y}px 15px rgba(114, 255, 255, 0.1)`);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center [perspective:1000px]">
      {/* Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />

      {/* Ambient Glow */}
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(78,165,165,0.05)_0%,transparent_70%)] top-[20%] right-[10%] pointer-events-none z-0" />

      {/* Main Inlay Frame */}
      <main
        ref={frameRef}
        className="relative w-[85vw] max-w-[1100px] h-[70vh] bg-gradient-to-br from-[#15120f] to-[#1e1a16] border border-bronze-metallic/20 p-16 flex flex-col justify-between shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_0_100px_rgba(0,0,0,0.3)] animate-frame-reveal transition-transform duration-200 ease-out group"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Animated Patina Border */}
        <div className="absolute inset-[-2px] -z-10 p-[2px] rounded-[inherit] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_40%,#2d5a5a_45%,#4ea5a5_50%,#2d5a5a_55%,transparent_60%)] bg-[length:300%_300%] animate-patina-shift" 
               style={{ 
                 maskImage: 'linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)',
                 maskComposite: 'exclude',
                 WebkitMaskComposite: 'xor',
                 padding: '2px'
               }}
          />
        </div>

        <MetaData>
          <span>Static State / Inlay 01</span>
          <span>Non-Relational</span>
        </MetaData>

        <div className="relative">
          <h1 
            className="text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-[#b87333] to-[#4a7c7c] drop-shadow-[0_2px_1px_rgba(0,0,0,0.5)] tracking-tighter translate-y-[20px] opacity-0 animate-text-reveal group-hover:from-bronze-bright group-hover:to-patina-vibrant transition-[background] duration-[2000ms]"
            style={{ textShadow }}
          >
            THYS IS A ONE-PAGE SITE<br />
            THAT CONTAINS EXACTLY<br />
            WHAT YOU ARE LOOKING AT.
          </h1>
          
          {/* Metal Inlay Line */}
          <div className="absolute -bottom-5 left-0 h-[1px] bg-gradient-to-r from-patina-light to-transparent animate-line-grow" />
          
          <p className="font-mono max-w-[500px] mt-12 text-patina-base text-[0.9rem] leading-[1.6] opacity-0 animate-fade-in-delayed">
            There is no explanation, no interaction, and no deeper meaning beyond the page itself. 
            The UI is the content—no buttons, no navigation, no context. It exists to be itself, and nothing else.
          </p>
        </div>

        <MetaData>
          <span>Coordinates: 0.00.00.0</span>
          <span>Oxidized Bronze Finish</span>
        </MetaData>
      </main>

      <footer className="fixed bottom-4 right-4 text-[10px] text-bronze-metallic/40 lowercase font-sans">
        a page from <a href="https://pageshyt.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-bronze-metallic transition-colors">pageshyt</a>
      </footer>
    </div>
  );
};

export default App;
