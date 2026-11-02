import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Grid, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onOpenShowreelModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenShowreelModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Interactive Web Audio subtle tactile click generator
  const playTactileClick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isMuted ? 440 : 880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  // Timecode counter simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const now = new Date();
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const ff = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`00:${mm}:${ss}:${ff}`);
    }, 41); // ~24fps update
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Mouse move perspective & spotlight calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Generative Canvas Animation: dynamic geometric rings, particle waves and kinetic grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

      // Deep obsidian clear
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5 + (mousePos.x - 0.5) * 40;
      const centerY = height * 0.5 + (mousePos.y - 0.5) * 40;

      if (isPlaying) {
        angle += isHovered ? 0.015 : 0.008;
      }

      // Draw subtle ambient glow
      const grad = ctx.createRadialGradient(
        width * mousePos.x,
        height * mousePos.y,
        10,
        width * mousePos.x,
        height * mousePos.y,
        width * 0.55
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw technical grid overlay if toggled
      if (showGrid) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 1;

        const gridSize = 48;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Center crosshairs
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(centerX - 16, centerY);
        ctx.lineTo(centerX + 16, centerY);
        ctx.moveTo(centerX, centerY - 16);
        ctx.lineTo(centerX, centerY + 16);
        ctx.stroke();
      }

      // Draw 3D-projected rotating concentric geometric rings (Creative Kinetic Wireframe)
      const ringCount = 6;
      for (let i = 1; i <= ringCount; i++) {
        const radius = (Math.min(width, height) * 0.1) * i;
        const currentAngle = angle * (i % 2 === 0 ? 1 : -1) + (i * 0.4);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentAngle);

        ctx.beginPath();
        // Elliptical deformation for 3D tilt effect
        ctx.ellipse(0, 0, radius, radius * 0.52, (mousePos.x - 0.5) * 0.5, 0, Math.PI * 2);
        
        ctx.strokeStyle = i === ringCount ? 'rgba(255, 255, 255, 0.22)' : `rgba(255, 255, 255, ${0.04 + i * 0.025})`;
        ctx.lineWidth = i % 2 === 0 ? 1.5 : 1;
        ctx.setLineDash(i % 2 === 0 ? [8, 12] : []);
        ctx.stroke();

        // Orbital nodes on outer rings
        if (i >= 3) {
          const nodeCount = 3;
          for (let n = 0; n < nodeCount; n++) {
            const nodeAngle = (n * (Math.PI * 2)) / nodeCount + angle * 2;
            const nx = Math.cos(nodeAngle) * radius;
            const ny = Math.sin(nodeAngle) * (radius * 0.52);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(nx, ny, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      }

      // Draw animated waveform along the lower third
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const waveY = height * 0.78;
      const points = 40;
      for (let p = 0; p <= points; p++) {
        const px = (width / points) * p;
        const dist = Math.abs(px - centerX) / (width * 0.5);
        const waveAmp = (1 - Math.min(1, dist)) * (isPlaying ? 14 : 2);
        const py = waveY + Math.sin(p * 0.35 + angle * 4) * waveAmp;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, isHovered, mousePos, showGrid]);

  // Subtle 3D perspective transform based on cursor
  const tiltX = (mousePos.y - 0.5) * -7;
  const tiltY = (mousePos.x - 0.5) * 7;

  return (
    <div className="w-full relative select-none">
      {/* Outer Banner Wrapper with Perspective */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0.5, y: 0.5 });
        }}
        style={{
          perspective: 1200,
        }}
        className="relative group rounded-none overflow-hidden"
      >
        <div
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.012 : 1})`,
            transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#070707] border border-neutral-800 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between"
        >
          {/* Background Animated Generative Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Vignette & Corner Accents */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none" />

          {/* Top Master HUD Bar */}
          <div className="relative z-10 flex items-center justify-between p-4 md:p-6 text-neutral-400 font-mono text-[11px] tracking-wider border-b border-neutral-800/60 bg-neutral-950/40 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <span
                  className={`w-2 h-2 ${
                    isPlaying ? 'bg-red-500' : 'bg-neutral-600'
                  } transition-colors`}
                />
                <span>{isPlaying ? 'LIVE REEL' : 'PAUSED'}</span>
              </span>
              <span className="text-neutral-600">/</span>
              <span className="tabular-nums text-neutral-300">{timecode}</span>
              <span className="hidden sm:inline-block text-neutral-600">/</span>
              <span className="hidden sm:inline-block text-neutral-400">24.00 FPS</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase bg-neutral-900 border border-neutral-750 text-neutral-300">
                16:9 4K UHD
              </span>
              <span className="hidden sm:inline-block text-[11px] text-neutral-400 font-sans tracking-normal">
                Visual Asset Placeholder
              </span>
            </div>
          </div>

          {/* Center Interactive Anchor & Play Trigger */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto px-4 text-center">
            <button
              onClick={() => {
                playTactileClick();
                setIsPlaying(!isPlaying);
              }}
              className="group/btn relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-300 active:scale-95 shadow-2xl backdrop-blur-md"
              aria-label={isPlaying ? 'Pause banner animation' : 'Play banner animation'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 md:w-7 md:h-7 fill-current" />
              ) : (
                <Play className="w-6 h-6 md:w-7 md:h-7 fill-current translate-x-0.5" />
              )}
              {/* Outer Pulse ring */}
              <div className="absolute -inset-2 border border-white/10 group-hover/btn:border-white/30 transition-all duration-500 pointer-events-none" />
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>Interactive Banner Reel · Hover & Move Cursor</span>
            </div>
          </div>

          {/* Bottom Interactive HUD & Control Strip */}
          <div className="relative z-10 flex items-center justify-between p-4 md:p-6 text-neutral-400 font-mono text-[11px] border-t border-neutral-800/60 bg-neutral-950/40 backdrop-blur-sm">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playTactileClick();
                  setIsMuted(!isMuted);
                }}
                className={`p-2 transition-colors border ${
                  !isMuted
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
                title={isMuted ? 'Enable Audio FX' : 'Mute Audio FX'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => {
                  playTactileClick();
                  setShowGrid(!showGrid);
                }}
                className={`px-2.5 py-1.5 transition-colors border text-[10px] uppercase tracking-wider flex items-center gap-1.5 ${
                  showGrid
                    ? 'bg-neutral-800 text-white border-neutral-700'
                    : 'bg-neutral-900/80 text-neutral-500 border-neutral-800 hover:text-white'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span className="hidden sm:inline">Grid Overlay</span>
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-[11px] text-neutral-400">
                Ready for user creative asset video/photo
              </span>
              {onOpenShowreelModal && (
                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenShowreelModal();
                  }}
                  className="p-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors"
                  title="Expand Full Reel Showcase"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
