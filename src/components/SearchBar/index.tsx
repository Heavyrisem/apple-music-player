import React, { HTMLAttributes, useCallback } from 'react';

import tw from 'twin.macro';

import { ComponentBaseProps } from '@src/types/BaseTypes';

interface SearchBarProps extends ComponentBaseProps, HTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder, ...props }) => {
  const handleInputKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.currentTarget.value !== '') {
        onSearch?.(e.currentTarget.value);
      }
    },
    [onSearch],
  );

  return (
    <input
      type="text"
      placeholder={placeholder}
      css={[tw`w-full rounded-xl p-4 text-lg font-bold`]}
      onKeyDown={handleInputKeydown}
      {...props}
    />
  );
};

export default SearchBar;
