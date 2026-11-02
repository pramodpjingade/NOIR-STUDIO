import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [time, setTime] = useState(24);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fullscreen reel canvas animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      if (isPlaying) frame++;

      // Animated geometric wireframe vortex
      const cx = width / 2;
      const cy = height / 2;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let r = 20; r < Math.max(width, height) * 0.7; r += 32) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.55, frame * 0.005, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Dynamic sine wave
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += 6) {
        const y = cy + Math.sin(x * 0.015 + frame * 0.04) * 45;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 p-6 md:p-8 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-850">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-red-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
              Studio Master Showreel 2026 // Cinematic Projection
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cinematic Black Visual Asset Holder */}
        <div className="relative w-full aspect-[16/9] bg-black border border-neutral-800 overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          <div className="relative z-10 text-center flex flex-col items-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform mb-4"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
            </button>
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              {isPlaying ? 'Playing High-Res Choreography Stream' : 'Playback Paused'}
            </div>
            <div className="text-[11px] font-mono text-neutral-400 mt-1">
              Visual asset carrier ready for custom client video reel file
            </div>
          </div>
        </div>

        {/* Bottom Control Strip */}
        <div className="mt-4 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 border border-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <span>AUDIO FX: {isMuted ? 'OFF' : 'SYNTH'}</span>
          </div>

          <div>4K PRORES 4444 XQ COLOR PROFILE</div>
        </div>
      </div>
    </div>
  );
};
