import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { css } from '@emotion/react';
import tw from 'twin.macro';

import DefaultLayout from '@components/Layouts/DefaultLayout';
import useEffectOnce from '@hooks/useEffectOnce';
import { randomRange } from '@utils/index';

interface GradientCanvasProps {}

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

const blendMode = css`
  mix-blend-mode: saturation;
`;

const GradientArea: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D>();
  const requestRef = useRef<number>();
  const renderTimeRef = useRef<number>();

  //   const [particles, setParticles] = useState<ParticleData[]>([]);
  const particlesRef = useRef<ParticleData[]>([]);
  const COLORS = useMemo(
    () => [
      { r: 121, g: 241, b: 131 },
      { r: 153, g: 1, b: 162 },
      { r: 42, g: 125, b: 153 },
      { r: 124, g: 125, b: 153 },
    ],
    [],
  );
  const fps = 24;
  const PI2 = useMemo(() => Math.PI * 2, []);
  const renderInterval = useMemo(() => 1000 / fps, [fps]);

  const render = useCallback(
    (renderData: ParticleData[]) => {
      // console.time('Render 1Frame');
      const { current: canvas } = canvasRef;
      const { current: ctx } = canvasCtxRef;
      if (!canvas || !ctx) return undefined;
      // console.log('RENDER');

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
        // ctx.ellipse(
        //   particle.pos.x,
        //   particle.pos.y,
        //   particle.size,
        //   particle.size,
        //   Math.PI / 4,
        //   0,
        //   PI2,
        // );
        ctx.fill();

        ctx.closePath();
      });
      // console.timeEnd('Render 1Frame');
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
        newParticle.vector.size += 0.01;
        newParticle.size += Math.sin(newParticle.vector.size) / 2;

        newParticle.pos.x += particle.vector.x;
        newParticle.pos.y += particle.vector.y;

        if (newParticle.pos.x < 0) {
          newParticle.vector.x *= -1;
          // newParticle.pos.x += 1;
        } else if (newParticle.pos.x > canvas.width) {
          newParticle.vector.x *= -1;
          // newParticle.pos.x -= 1;
        }

        if (newParticle.pos.y < 0) {
          newParticle.vector.y *= -1;
          // newParticle.pos.y += 1;
        } else if (newParticle.pos.y > canvas.height) {
          newParticle.vector.y *= -1;
          // newParticle.pos.y -= 1;
        }

        return newParticle;
      });
      // console.log(delta, renderTime);
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
    canvas.width = (document.body.clientWidth * pixelRatio) / 4;
    canvas.height = (document.body.clientHeight * pixelRatio) / 4;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    ctx.globalCompositeOperation = 'saturation';
    // ctx.scale(pixelRatio / 1, pixelRatio / 1);

    const particleN = 15;
    const minSize = 500;
    const maxSize = 550;

    const tempParticles: ParticleData[] = [];

    for (let i = 0; i < particleN; i += 1) {
      const color = COLORS[i % COLORS.length];
      tempParticles[i] = {
        pos: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        vector: {
          x: (Math.random() * Math.round(randomRange(0, 1)) ? 1 : -1) * 1,
          y: (Math.random() * Math.round(randomRange(0, 1)) ? 1 : -1) * 1,
          size: randomRange(1, 100),
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
        console.log('ANIMATION END');
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [COLORS, animate]);

  useEffect(() => {
    inialize();
  }, [canvasRef.current?.width, canvasRef.current?.height, inialize]);

  useEffect(() => {
    console.log(particlesRef.current);
  }, [particlesRef]);

  return (
    <DefaultLayout Css={tw`bg-indigo-500`}>
      <canvas ref={canvasRef} css={[tw`w-full h-full`]} />
    </DefaultLayout>
    //   <div css={blendMode}>

    //   <div
    //     css={[
    //       tw`rounded-full w-[150rem] h-[150rem]`,
    //       tw`absolute top-[-50rem]`,
    //       css`
    //         background: radial-gradient(#d064e6 0%, #ffffff00 60%, #ffffff00 100%);
    //       `,
    //       blendMode,
    //     ]}
    //   />
    //   <div
    //     css={[
    //       tw`rounded-full w-[150rem] h-[150rem]`,
    //       tw`absolute top-[6rem]`,
    //       css`
    //         background: radial-gradient(red 0%, #ffffff00 60%, #ffffff00 100%);
    //       `,
    //       blendMode,
    //     ]}
    //   />
    //   <div
    //     css={[
    //       tw`rounded-full w-[150rem] h-[150rem]`,
    //       tw`absolute top-[-30rem] left-[-50rem]`,
    //       css`
    //         background: radial-gradient(#d064e6 0%, #ffffff00 60%, #ffffff00 100%);
    //       `,
    //       blendMode,
    //     ]}
    //   />
    // </div>
  );
};

export default GradientArea;
