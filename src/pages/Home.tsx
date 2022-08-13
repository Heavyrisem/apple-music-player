import React from 'react';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import DefaultLayout from '@components/Layouts/DefaultLayout';

const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <CoverImage src="./heat_waves.jpg" />
      <AudioPlayer
        src="heat_waves.mp3"
        title="Heat Waves"
        artist="Glass Animals"
        album="Dreamland"
      />
    </DefaultLayout>
  );
};

export default Home;
