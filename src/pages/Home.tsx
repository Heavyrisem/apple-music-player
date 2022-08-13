import React from 'react';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import DefaultLayout from '@components/Layouts/DefaultLayout';

const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <CoverImage src="./heat_waves.jpg" />
      <AudioPlayer src="heat_waves.mp3" title="Heat Waves" author="Glass Animals" />
    </DefaultLayout>
  );
};

export default Home;
