import React, { HTMLAttributes } from 'react';

import tw from 'twin.macro';

import { ComponentBaseProps } from '@src/types/BaseTypes';

interface DefaultLayoutProps extends ComponentBaseProps, HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, ...props }) => {
  return (
    <div css={[tw`flex h-screen flex-col items-center justify-around w-screen`]} {...props}>
      {children}
    </div>
  );
};

export default DefaultLayout;
