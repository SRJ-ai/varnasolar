import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export const EarthGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1], // Dark gray
      markerColor: [1, 0.3, 0],   // Varna Solar Sun Orange
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        // Telangana / Andhra Pradesh approximate coordinates
        { location: [17.3850, 78.4867], size: 0.1 }, // Hyderabad
        { location: [17.6868, 83.2185], size: 0.08 }, // Visakhapatnam
        { location: [16.5062, 80.6480], size: 0.06 }, // Vijayawada
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          width: 400,
          height: 400,
          maxWidth: "100%",
          aspectRatio: 1,
        }}
      />
    </div>
  );
};
