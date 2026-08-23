import React, { useEffect, useRef } from 'react';

export const SolarRayShader: React.FC<{ className?: string }> = ({ className = 'absolute inset-0 w-full h-full' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          // Smooth transition based on mouse position
          float transition = smoothstep(0.3, 0.7, mouse.x);
          
          // 1. Dual Atmosphere Background
          vec3 morningBg = mix(vec3(0.08, 0.06, 0.02), vec3(0.15, 0.1, 0.05), uv.y);
          vec3 nightBg = mix(vec3(0.02, 0.02, 0.05), vec3(0.01, 0.01, 0.02), uv.y);
          vec3 baseColor = mix(morningBg, nightBg, transition);
          
          // 2. Dynamic Solar Light Rays
          float rays = 0.0;
          for(float i = 0.0; i < 4.0; i++) {
              float speed = 0.15 + i * 0.05;
              float offset = i * 1.5;
              float wave = sin(uv.x * 2.5 + u_time * speed + offset) * 0.12;
              rays += 0.003 / abs(uv.y - 0.5 + wave);
          }
          vec3 solarGold = vec3(1.0, 0.65, 0.1) * rays * (1.0 - transition * 0.85);
          
          // 3. Procedural Star Field
          float stars = 0.0;
          if(transition > 0.1) {
              vec2 starUV = uv * 50.0;
              vec2 id = floor(starUV);
              vec2 f = fract(starUV);
              float n = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453);
              if(n > 0.98) {
                  stars = smoothstep(0.0, 1.0, (1.0 - length(f - 0.5) * 2.0)) * 0.5 * transition;
              }
          }
          vec3 spaceDetail = vec3(0.8, 0.9, 1.0) * stars;

          gl_FragColor = vec4(baseColor + solarGold + spaceDetail, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, src: string) {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    let animId: number;

    function render(t: number) {
      if (!gl || !canvas) return;
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
      if (resizeObserver && canvas) resizeObserver.unobserve(canvas);
    };
  }, []);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
