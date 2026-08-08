import React, { useEffect, useRef } from 'react';
import './PixelCard.css';

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  isIdle: boolean;
  phase: 'wait' | 'grow' | 'shrink' | 'idle';
  delayForward: number;
  delayReverse: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delayForward: number, delayReverse: number, gap: number) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = gap;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delayForward = delayForward;
    this.delayReverse = delayReverse;
    this.delay = delayForward;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = true;
    this.phase = 'idle';
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  trigger(isReverse: boolean) {
    this.phase = 'wait';
    this.counter = 0;
    this.size = 0;
    this.isIdle = false;
    this.delay = isReverse ? this.delayReverse : this.delayForward;
  }

  burst() {
    if (this.phase === 'idle') return;

    if (this.phase === 'wait') {
      if (this.counter <= this.delay) {
        this.counter += this.counterStep;
        return;
      } else {
        this.phase = 'grow';
      }
    }
    
    if (this.phase === 'grow') {
      this.size += this.sizeStep;
      if (this.size >= this.maxSize) {
        this.phase = 'shrink';
      }
    } else if (this.phase === 'shrink') {
      this.size -= this.sizeStep;
      if (this.size <= 0) {
        this.size = 0;
        this.phase = 'idle';
        this.isIdle = true;
      }
    }
    this.draw();
  }
}

function getEffectiveSpeed(value: string | number) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = typeof value === 'string' ? parseInt(value, 10) : value;

  if (parsed <= min) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

interface VariantConfig {
  activeColor: string | null;
  gap: number;
  speed: number;
  colors: string;
  noFocus: boolean;
}

const VARIANTS: Record<string, VariantConfig> = {
  default: {
    activeColor: null,
    gap: 5,
    speed: 35,
    colors: '#f8fafc,#f1f5f9,#cbd5e1',
    noFocus: false
  },
  blue: {
    activeColor: '#e0f2fe',
    gap: 10,
    speed: 25,
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',
    noFocus: false
  },
  yellow: {
    activeColor: '#fef08a',
    gap: 3,
    speed: 20,
    colors: '#fef08a,#fde047,#eab308',
    noFocus: false
  },
  pink: {
    activeColor: '#fecdd3',
    gap: 6,
    speed: 80,
    colors: '#fecdd3,#fda4af,#e11d48',
    noFocus: true
  }
};

interface PixelCardProps {
  variant?: 'default' | 'blue' | 'yellow' | 'pink';
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PixelCard({ 
  variant = 'default', 
  gap, 
  speed, 
  colors, 
  noFocus, 
  className = '', 
  style,
  children 
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(performance.now());

  const variantCfg = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;
  const finalNoFocus = noFocus ?? variantCfg.noFocus;

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext('2d');
    
    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const maxDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
    const colorsArray = finalColors.split(',');
    const pxs: Pixel[] = [];
    for (let x = 0; x < width; x += finalGap) {
      for (let y = 0; y < height; y += finalGap) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delayForward = distance;
        const delayReverse = Math.max(0, maxDistance - distance);

        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed), delayForward, delayReverse, finalGap));
      }
    }
    pixelsRef.current = pxs;
  };

  const doAnimate = () => {
    animationRef.current = requestAnimationFrame(() => doAnimate());
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      pixel.burst();
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    if (allIdle && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleAnimation = (isReverse: boolean) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    pixelsRef.current.forEach(p => p.trigger(isReverse));
    animationRef.current = requestAnimationFrame(() => doAnimate());
  };

  const onMouseEnter = () => handleAnimation(false);
  const onMouseLeave = () => handleAnimation(true);
  const onFocus = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation(false);
  };
  const onBlur = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation(true);
  };

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas className="pixel-canvas" ref={canvasRef} />
      {children}
    </div>
  );
}
