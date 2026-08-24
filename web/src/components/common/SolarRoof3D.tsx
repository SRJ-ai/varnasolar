import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const SolarRoof3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // 2. Build Realistic Pitched Roof
    const roofGeometry = new THREE.BoxGeometry(14, 0.5, 10);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3a3f44, 
      roughness: 0.9, 
      metalness: 0.1 
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.receiveShadow = true;
    roof.castShadow = true;
    roof.rotation.x = Math.PI / 12; // Pitch the roof
    group.add(roof);

    // 3. Build Solar Panel Array
    const rows = 3;
    const cols = 8;
    const panelW = 1.05;
    const panelH = 1.8;
    const gap = 0.05;

    const panelGeometry = new THREE.BoxGeometry(panelW, 0.05, panelH);
    
    // Glossy silicon material
    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x051024,
      metalness: 0.8,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.6, roughness: 0.4 });
    const panels: THREE.Mesh[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * (panelW + gap);
        const z = (r - (rows - 1) / 2) * (panelH + gap);
        
        // Panel core
        const panel = new THREE.Mesh(panelGeometry, panelMaterial.clone());
        panel.castShadow = true;
        panel.receiveShadow = true;
        
        // Panel aluminum frame (slightly larger)
        const frameGeom = new THREE.BoxGeometry(panelW + 0.02, 0.04, panelH + 0.02);
        const frame = new THREE.Mesh(frameGeom, frameMaterial);
        frame.position.y = -0.01;
        panel.add(frame);
        
        // Position on roof
        panel.position.set(x, 0.28, z);
        panel.rotation.x = Math.PI / 12; // Match roof pitch
        
        // Custom user data for raycasting
        panel.userData = { isPanel: true, originalColor: 0x051024 };
        panels.push(panel);
        group.add(panel);
      }
    }

    scene.add(group);

    // 4. Lighting Setup (Sunlight + Ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7e6, 2.5); // Warm sun
    sunLight.position.set(10, 15, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    scene.add(sunLight);

    const fillLight = new THREE.PointLight(0x00d2ff, 1, 20); // Sky reflection
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // 5. Interactive Raycasting (Hover effect)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredPanel: THREE.Mesh | null = null;

    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event: PointerEvent) => {
      // For Rotation
      targetX = (event.clientX - windowHalfX) * 0.001;
      targetY = (event.clientY - windowHalfY) * 0.001;

      // For Raycasting (Hover)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    document.addEventListener('pointermove', onPointerMove);

    // 6. Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Smooth dragging rotation
      group.rotation.y += 0.05 * (targetX - group.rotation.y);
      group.rotation.x += 0.05 * (targetY - group.rotation.x);

      // Default slow idle spin if not moving mouse much
      if (Math.abs(targetX) < 0.1 && Math.abs(targetY) < 0.1) {
        group.rotation.y += 0.001;
      }

      // Raycaster logic
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(panels);

      if (intersects.length > 0) {
        const object = intersects[0].object as THREE.Mesh;
        if (hoveredPanel !== object) {
          // Reset previous
          if (hoveredPanel) {
            (hoveredPanel.material as THREE.MeshPhysicalMaterial).color.setHex(hoveredPanel.userData.originalColor);
          }
          // Highlight new
          hoveredPanel = object;
          (hoveredPanel.material as THREE.MeshPhysicalMaterial).color.setHex(0x1a457b); // Glow blue
        }
      } else {
        if (hoveredPanel) {
          (hoveredPanel.material as THREE.MeshPhysicalMaterial).color.setHex(hoveredPanel.userData.originalColor);
          hoveredPanel = null;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

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

  return <div ref={containerRef} className="w-full h-[400px] md:h-[600px] cursor-crosshair active:cursor-grabbing" />;
};
