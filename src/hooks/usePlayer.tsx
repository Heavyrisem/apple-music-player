import React, { useState } from 'react';

import { usePalette } from 'color-thief-react';

import { Color } from '@components/GradientCanvas';

interface UsePlayerParams {
  imgSrc?: string;
}

const usePlayer = ({ imgSrc }: UsePlayerParams) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [colors, setColors] = useState<Color[]>();
  const { data: colorPalette } = usePalette(imgSrc || '', 10, 'rgbArray', {
    crossOrigin: 'https://lh3.googleusercontent.com',
    quality: 1,
  });

  return {
    currentTime,
    showLyrics,
    colors,
    colorPalette,
    setCurrentTime,
    setShowLyrics,
    setColors,
  };
};

export default usePlayer;
