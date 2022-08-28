import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import tw from 'twin.macro';

import { bgTransparentGray } from '@styles/globalStyles';

interface RangeSliderProps {
  min?: number;
  max?: number;
  value?: number;
  showCursor?: boolean;
  Css?: CSSInterpolation;
  onChange?: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 1000,
  value = 50,
  showCursor = false,
  Css,
  onChange,
}) => {
  // HTML Range input 의 값을 저장하는 변수
  const [valueState, setValueState] = useState<number>(value);

  // @emotion/react 의 css 를 불러와서 작업
  const InputRangeStyle = useMemo(() => {
    const v = Math.floor(valueState);
    const width = `${(v / max) * 100}%`;

    return css`
      ${tw`appearance-none w-full rounded-full outline-none border-none opacity-95 relative h-1`}
      ${bgTransparentGray}

      &::before {
        ${tw`h-1 rounded-full float-left absolute bg-white min-w-[.8%]`}
        z-index: -1;
        content: '';
        width: ${width};
      }

      &::-webkit-slider-runnable-track {
        ${tw`appearance-none w-full rounded-full`}
      }

      &::-webkit-slider-thumb {
        ${tw`appearance-none h-3.5 w-1.5 rounded-full duration-200 bg-white border-solid border border-black`}
        box-sizing: border-box;
        opacity: ${showCursor ? 1 : 0};
      }
    `;
  }, [max, showCursor, valueState]);

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueState(Number(e.target.value));
      onChange?.(Number(e.target.value));
    },
    [onChange],
  );

  useEffect(() => {
    setValueState(value);
    // console.log('setValue', value);
  }, [value]);

  return (
    <input
      type="range"
      value={valueState}
      css={[InputRangeStyle, Css]}
      min={min}
      max={max}
      onChange={handleValueChange}
    />
  );
};

export default RangeSlider;
