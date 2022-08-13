import React, { useCallback, useEffect, useRef, useState } from 'react';

import useMouse from '@hooks/useMouse';

interface RangeSliderProps {
  //   min: number;
  //   max: number;
  value?: number;
  showCursor: boolean;
  onChange?: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value = 50, showCursor, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [valueState, setValueState] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const { mousePosition, isMouseDown } = useMouse({});

  const dragHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;

      console.log('Dragging');
      const { clientX } = e;
      const { left, right } = e.currentTarget.getBoundingClientRect();
      const newValue = Math.round(((clientX - left) / (right - left)) * 100);
      setValueState(newValue);
      if (onChange) {
        onChange(newValue);
      }
    },
    [isDragging, onChange],
  );

  useEffect(() => {
    if (isDragging) {
      if (!isMouseDown) {
        console.log('Not dragging anymore');
        return setIsDragging(false);
      }

      console.log('Moving');
      const { current: slider } = sliderRef;
      if (slider) {
        const { left, right } = slider.getBoundingClientRect();
        const newValue = Math.round(((mousePosition.x - left) / (right - left)) * 100);
        setValueState(newValue);
      }
    }
    return undefined;
  }, [isDragging, isMouseDown, mousePosition.x]);

  useEffect(() => {
    // console.log(
    //   'isDragging',
    //   isDragging,
    //   'isMouseDown',
    //   isMouseDown,
    //   'mousePosition.x',
    //   mousePosition.x,
    // );
  }, [isDragging, isMouseDown, mousePosition.x]);

  return (
    <div
      className="h-1 select-none rounded-2xl bg-gray-300"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      <div
        className="relative h-full rounded-2xl bg-white"
        style={{ width: `${valueState}%` }}
        ref={sliderRef}
      />
      {showCursor && (
        <div
          className="relative -top-0.5 h-3.5 w-1.5 -translate-y-2/4 -translate-x-2/4 cursor-ew-resize rounded border border-gray-700 bg-gray-200"
          style={{ left: `${valueState}%` }}
        />
      )}
    </div>
  );
};

export default RangeSlider;
