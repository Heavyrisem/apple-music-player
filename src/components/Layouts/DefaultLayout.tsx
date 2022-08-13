import React from 'react';

import tw from 'twin.macro';

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div css={[tw`flex h-screen flex-col items-center justify-around bg-[rgb(130 37 137)]`]}>
      {children}
    </div>
  );
};

export default DefaultLayout;
