import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export const EarthGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current || !containerRef.current) return;

    // Check if system is in dark mode
    const isDark = document.documentElement.classList.contains('dark');

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: isDark ? [0.3, 0.3, 0.3] : [1, 1, 1],
      markerColor: [1, 0.3, 0],   // Varna Solar Sun Orange
      glowColor: isDark ? [0.1, 0.1, 0.1] : [1, 1, 1],
      markers: [
        // Telangana / Andhra Pradesh approximate coordinates
        { location: [17.3850, 78.4867], size: 0.1 }, // Hyderabad
        { location: [17.6868, 83.2185], size: 0.08 }, // Visakhapatnam
        { location: [16.5062, 80.6480], size: 0.06 }, // Vijayawada
      ],
      // @ts-ignore
      onRender: (state) => {
        // Called on every animation frame.
        state.phi = phi;
        phi += 0.005;
        
        // Dynamically size based on container
        if (containerRef.current) {
          state.width = containerRef.current.clientWidth * 2;
          state.height = containerRef.current.clientHeight * 2;
        }
      }
    });

    // Resize observer to keep the globe responsive
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.style.width = '100%';
        canvasRef.current.style.height = '100%';
      }
    });
    
    resizeObserver.observe(containerRef.current);

    return () => {
      globe.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: 1,
        }}
      />
    </div>
  );
};
