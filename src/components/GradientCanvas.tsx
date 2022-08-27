import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import tw from 'twin.macro';

import useEffectOnce from '@hooks/useEffectOnce';
import { ComponentBaseProps } from '@src/types/BaseTypes';
import { randomBool, randomRange } from '@utils/index';

interface GradientCanvasProps extends ComponentBaseProps {
  colors: { r: number; g: number; b: number }[];
  fps?: number;
  particleNumber?: number;
}

interface ParticleData {
  color: { r: number; g: number; b: number };
  size: number;
  pos: {
    x: number;
    y: number;
  };
  vector: {
    x: number;
    y: number;
    size: number;
  };
}

const GradientCanvas: React.FC<GradientCanvasProps> = ({
  colors,
  fps = 24,
  particleNumber = 10,
  Css,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D>();
  const requestRef = useRef<number>();
  const renderTimeRef = useRef<number>();

  const particlesRef = useRef<ParticleData[]>([]);
  const PI2 = useMemo(() => Math.PI * 2, []);
  const renderInterval = useMemo(() => 1000 / fps, [fps]);

  const render = useCallback(
    (renderData: ParticleData[]) => {
      const { current: canvas } = canvasRef;
      const { current: ctx } = canvasCtxRef;
      if (!canvas || !ctx) return undefined;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderData.forEach((particle) => {
        ctx.beginPath();

        const g = ctx.createRadialGradient(
          particle.pos.x,
          particle.pos.y,
          particle.size * 0.01,
          particle.pos.x,
          particle.pos.y,
          particle.size,
        );
        g.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 1)`);
        g.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
        ctx.fillStyle = g;
        // ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 1)`;
        ctx.arc(particle.pos.x, particle.pos.y, particle.size, 0, PI2, false);
        ctx.fill();

        ctx.closePath();
      });
      return undefined;
    },
    [PI2],
  );

  const animate = useCallback(() => {
    const { current: canvas } = canvasRef;
    const { current: particles } = particlesRef;
    const { current: renderTime } = renderTimeRef;
    if (!canvas || !particles || renderTime === undefined) return undefined;

    const now = Date.now();
    const delta = now - renderTime;
    if (delta > renderInterval) {
      const animatedParticles = particles.map((particle) => {
        const newParticle = particle;
        newParticle.vector.size += 0.02;
        newParticle.size += Math.sin(newParticle.vector.size);

        newParticle.pos.x += particle.vector.x;
        newParticle.pos.y += particle.vector.y;

        if (newParticle.pos.x < canvas.width - canvas.width * 1.5) {
          newParticle.vector.x *= -1;
        } else if (newParticle.pos.x > canvas.width * 1.5) {
          newParticle.vector.x *= -1;
        }

        if (newParticle.pos.y < canvas.height - canvas.height * 1.5) {
          newParticle.vector.y *= -1;
        } else if (newParticle.pos.y > canvas.height * 1.5) {
          newParticle.vector.y *= -1;
        }

        return newParticle;
      });
      renderTimeRef.current = now - (delta % renderInterval);
      particlesRef.current = animatedParticles;
      render(animatedParticles);
    }

    requestRef.current = window.requestAnimationFrame(animate);
    return undefined;
  }, [render, renderInterval]);

  const inialize = useCallback(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return undefined;

    // const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    const pixelRatio = 1;
    canvas.width = ((document.body.clientWidth / 2) * pixelRatio) / 2;
    canvas.height = (document.body.clientHeight * pixelRatio) / 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    ctx.scale(pixelRatio / 1, pixelRatio / 1);
    ctx.globalCompositeOperation = 'saturation';

    const maxSize = 400 * (document.body.clientWidth / 1500);
    const minSize = 300 * (document.body.clientWidth / 1500);

    const tempParticles: ParticleData[] = [];

    for (let i = 0; i < particleNumber; i += 1) {
      const color = colors[i % colors.length];
      tempParticles[i] = {
        pos: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        vector: {
          x: Math.random() * (randomBool() ? 1 : -1) * 3,
          y: Math.random() * (randomBool() ? 1 : -1) * 3,
          size: randomRange(0, 1),
        },
        size: Math.random() * (maxSize - minSize) + minSize,
        color,
      };
    }

    canvasCtxRef.current = ctx;
    particlesRef.current = tempParticles;
    renderTimeRef.current = Date.now();
    requestRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        // console.log('ANIMATION END');
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, colors, particleNumber]);

  useEffectOnce(inialize);

  // useEffect(() => {
  //   inialize();
  // }, [canvasRef.current?.width, canvasRef.current?.height, inialize]);

  // useEffect(() => {
  //   console.log(particlesRef.current);
  // }, [particlesRef]);

  return (
    <div css={[tw`w-full h-full`, Css]}>
      <canvas ref={canvasRef} css={[tw`w-full h-full`]} />
    </div>
  );
};

export default GradientCanvas;