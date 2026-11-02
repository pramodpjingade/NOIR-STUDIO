import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface SpatialScrollSceneProps {
  scrollProgress: number;
  scrollVelocity: number;
  activeSection: string;
}

// Reusable math vectors to prevent garbage collection inside render loop
const _targetPos = new THREE.Vector3();
const _targetRot = new THREE.Vector3();

export const SpatialScrollScene: React.FC<SpatialScrollSceneProps> = ({
  scrollProgress,
  scrollVelocity,
  activeSection,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [is3DActive, setIs3DActive] = useState(true);

  // References to keep updated values inside Three.js animation loop without re-triggering useEffect
  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  const velocityRef = useRef(scrollVelocity);
  velocityRef.current = scrollVelocity;

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Initialize Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map for PBR reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (3-point balance: warm directional key + cool hemisphere fill)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x38bdf8, 0x050505, 1.2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 1.8);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    // 5. Procedural Composite 3D Sculpture (THREE.Group with 5 distinct parts)
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Part A: Inner Obsidian Crystal Core (Octahedron with bevel-like faceting)
    const crystalGeo = new THREE.OctahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f0f12,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      wireframe: false,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    sculptureGroup.add(crystalMesh);

    // Part B: Outer Geometric Faceted Wireframe Cage (Icosahedron)
    const cageGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    sculptureGroup.add(cageMesh);

    // Part C & D: Concentric Kinetic Gimbal Rings (Orthogonal Torus Rings)
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.25,
    });
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.022, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    sculptureGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.016, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2.5;
    sculptureGroup.add(ringMesh2);

    // Part E: Orbital Constellation Nodes (InstancedMesh for high performance)
    const nodeCount = 90;
    const nodeGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const dummy = new THREE.Object3D();

    const nodeDistances: number[] = [];
    const nodeSpeeds: number[] = [];
    const nodePhases: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const speed = (0.2 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
      const phase = Math.random() * Math.PI * 2;
      nodeDistances.push(radius);
      nodeSpeeds.push(speed);
      nodePhases.push(phase);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dummy.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    sculptureGroup.add(instancedNodes);

    // Mouse Move Tracking for interactive parallax
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * -2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with Exponential Damping & Scroll Choreography
    let frameId = 0;
    let clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const p = progressRef.current;
      const v = velocityRef.current;
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      // Choreograph 3D position, rotation, and scale based on scroll sections:
      // Hero (0.0): Center, prominent scale, floating
      // Works (0.2-0.5): Shifts right flank, rotated wireframe view
      // Capabilities (0.5-0.75): Shifts left flank, gyroscopic alignment
      // Philosophy (0.75-0.9): Expands center-back
      // Metrics / Footer (0.9-1.0): Grounded specular angle
      if (p < 0.22) {
        // Hero Stage
        _targetPos.set(0, 0.1 + Math.sin(time * 0.8) * 0.12, 0);
        _targetRot.set(time * 0.2 + p * 4, time * 0.35 + p * 6, Math.sin(time * 0.4) * 0.1);
        sculptureGroup.scale.setScalar(1.0 + Math.abs(v) * 0.05);
      } else if (p < 0.5) {
        // Selected Works Stage: Drift to right flank
        const localT = (p - 0.22) / 0.28;
        _targetPos.set(1.9 + localT * 0.4, -0.1 + Math.sin(time) * 0.08, -0.6);
        _targetRot.set(0.6 + p * 5, 1.2 + p * 7, localT * 0.8);
        sculptureGroup.scale.setScalar(0.92);
      } else if (p < 0.75) {
        // Capabilities Stage: Pivot to left flank
        const localT = (p - 0.5) / 0.25;
        _targetPos.set(-2.0 + localT * 0.3, 0.2 + Math.cos(time) * 0.08, -0.4);
        _targetRot.set(p * 8, Math.PI * 0.8 + p * 4, p * 3);
        sculptureGroup.scale.setScalar(0.95);
      } else if (p < 0.9) {
        // Philosophy Stage: Center elevation & particle field emphasis
        _targetPos.set(0, 0.6, -1.2);
        _targetRot.set(p * 6, time * 0.5 + p * 5, 0.4);
        sculptureGroup.scale.setScalar(1.15);
      } else {
        // Metrics & Footer Stage: Grounded bottom-right presence
        _targetPos.set(1.6, -0.8, -0.2);
        _targetRot.set(0.8 + p * 4, -0.5 + p * 6, 0.2);
        sculptureGroup.scale.setScalar(0.88);
      }

      // Add smooth mouse interaction offset
      _targetPos.x += mx * 0.35;
      _targetPos.y += my * 0.35;
      _targetRot.x += my * 0.25;
      _targetRot.y += mx * 0.35;

      // Exponential damping for physical fluidity (smooth inertia)
      sculptureGroup.position.x = THREE.MathUtils.damp(
        sculptureGroup.position.x,
        _targetPos.x,
        4.5,
        delta
      );
      sculptureGroup.position.y = THREE.MathUtils.damp(
        sculptureGroup.position.y,
        _targetPos.y,
        4.5,
        delta
      );
      sculptureGroup.position.z = THREE.MathUtils.damp(
        sculptureGroup.position.z,
        _targetPos.z,
        4.5,
        delta
      );

      sculptureGroup.rotation.x = THREE.MathUtils.damp(
        sculptureGroup.rotation.x,
        _targetRot.x,
        4.0,
        delta
      );
      sculptureGroup.rotation.y = THREE.MathUtils.damp(
        sculptureGroup.rotation.y,
        _targetRot.y,
        4.0,
        delta
      );
      sculptureGroup.rotation.z = THREE.MathUtils.damp(
        sculptureGroup.rotation.z,
        _targetRot.z,
        4.0,
        delta
      );

      // Relative orbital motion of individual components
      crystalMesh.rotation.y += delta * (0.4 + Math.abs(v) * 0.6);
      cageMesh.rotation.x -= delta * 0.25;
      cageMesh.rotation.y += delta * 0.15;
      ringMesh1.rotation.z += delta * (0.6 + Math.abs(v) * 0.8);
      ringMesh2.rotation.y -= delta * (0.5 + Math.abs(v) * 0.5);

      // Orbital nodes orbit animation
      for (let i = 0; i < nodeCount; i++) {
        const angle = time * nodeSpeeds[i] * 0.8 + nodePhases[i] + p * 3;
        const radius = nodeDistances[i] * (1 + Math.sin(time + i) * 0.05);
        const theta = angle;
        const phi = (i / nodeCount) * Math.PI;

        dummy.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );
        dummy.rotation.set(angle, angle, 0);
        dummy.updateMatrix();
        instancedNodes.setMatrixAt(i, dummy.matrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;

      // Render
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      crystalGeo.dispose();
      crystalMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      instancedNodes.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Background WebGL Canvas Container */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 opacity-85 transition-opacity duration-700"
      />

      {/* Sleek Floating 3D Spatial Scroll HUD Pill (Zero-pill discipline: minimal unboxed monospace HUD) */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3 px-3.5 py-2 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-400 select-none shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white" />
          <span className="text-white uppercase tracking-wider">3D Spatial Reactor</span>
        </div>
        <span className="text-neutral-700">·</span>
        <div className="flex items-center gap-1.5">
          <span>Depth:</span>
          <span className="text-white font-medium tabular-nums">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
        <span className="text-neutral-700">·</span>
        <div className="text-neutral-400 uppercase tracking-wider text-[10px]">
          {activeSection}
        </div>
      </div>
    </>
  );
};
