import React from 'react';

import { css } from '@emotion/react';
import tw from 'twin.macro';

import GradientCanvas from '@components/GradientCanvas';
import DefaultLayout from '@components/Layouts/DefaultLayout';

const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <GradientCanvas
        colors={[
          { r: 255, g: 0, b: 255 },
          // { r: 75, g: 0, b: 130 },
          { r: 172, g: 225, b: 241 },
          { r: 50, g: 255, b: 10 },
        ]}
        fps={144}
        // particleNumber={35}
        Css={[
          tw`absolute`,
          css`
            background: rgb(172, 225, 241);
            z-index: -1;
          `,
        ]}
      />
    </DefaultLayout>
  );
};

export default Home;
