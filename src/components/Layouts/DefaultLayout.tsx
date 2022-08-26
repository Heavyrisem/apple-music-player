import React from 'react';

import tw from 'twin.macro';

import { ComponentBaseProps } from '@src/types/BaseTypes';

interface DefaultLayoutProps extends ComponentBaseProps {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, Css }) => {
  return (
    <div css={[tw`flex h-screen flex-col items-center justify-around bg-[rgb(130 37 137)]`, Css]}>
      {children}
    </div>
  );
};

export default DefaultLayout;
