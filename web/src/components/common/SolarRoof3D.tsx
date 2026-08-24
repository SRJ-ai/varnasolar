import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const SolarRoof3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create Stylized Solar Panel Array
    const panelGroup = new THREE.Group();

    const rows = 3;
    const cols = 5;
    const panelWidth = 1.2;
    const panelHeight = 2.0;
    const gap = 0.1;

    const panelGeometry = new THREE.PlaneGeometry(panelWidth, panelHeight);
    
    // Create a custom material that looks like a solar panel
    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a192f, // Deep dark blue
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    });

    // Grid lines (silver)
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x8892b0, transparent: true, opacity: 0.3 });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * (panelWidth + gap);
        const z = (r - (rows - 1) / 2) * (panelHeight + gap);
        
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.rotation.x = -Math.PI / 2; // Lay flat
        panel.rotation.x += Math.PI / 12; // Tilt it slightly up like a roof mount
        panel.position.set(x, 0, z);
        
        // Add grid lines to mimic cells
        const edges = new THREE.EdgesGeometry(panelGeometry);
        const line = new THREE.LineSegments(edges, gridMaterial);
        panel.add(line);

        panelGroup.add(panel);
      }
    }

    scene.add(panelGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const blueLight = new THREE.PointLight(0x00d2ff, 1, 20);
    blueLight.position.set(-5, 3, -5);
    scene.add(blueLight);

    const orangeLight = new THREE.PointLight(0xff4d00, 1.5, 20);
    orangeLight.position.set(5, -2, 5);
    scene.add(orangeLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event: PointerEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener('pointermove', onPointerMove);

    // Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      panelGroup.rotation.y += 0.002; // Slow auto rotation
      
      // Add mouse influence
      panelGroup.rotation.x += 0.05 * (targetY - panelGroup.rotation.x);
      panelGroup.rotation.z += 0.05 * (targetX - panelGroup.rotation.z);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing" />;
};
