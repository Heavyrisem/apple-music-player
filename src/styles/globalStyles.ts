import tw, { css } from 'twin.macro';

const textTransparentGray = tw`text-white text-opacity-50`;
const bgTransparentGray = tw`bg-white bg-opacity-50`;

const variables = {
  transparentGray: `rgba(255 255 255 / 0.7)`,
};

const hideScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export { textTransparentGray, bgTransparentGray, variables, hideScrollbar };
