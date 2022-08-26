import tw, { css } from 'twin.macro';

const textTransparentGray = tw`text-gray-100 text-opacity-50`;
const bgTransparentGray = tw`bg-gray-100 bg-opacity-50`;

const variables = {
  transparentGray: `rgba(243 244 246 / 0.5)`,
};

const hideScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export { textTransparentGray, bgTransparentGray, variables, hideScrollbar };
