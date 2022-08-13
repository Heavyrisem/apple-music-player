import React from 'react';

interface UseMouseParams {
  onMouseMove?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
}

const useMouse = ({ onMouseMove, onMouseDown, onMouseUp }: UseMouseParams) => {
  const { body } = document;

  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  body.addEventListener('mousemove', (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    onMouseMove?.(e);
  });

  body.addEventListener('mousedown', (e) => {
    setIsMouseDown(true);
    onMouseDown?.(e);
  });

  body.addEventListener('mouseup', (e) => {
    setIsMouseDown(false);
    onMouseUp?.(e);
  });

  return { mousePosition, isMouseDown };
};

export default useMouse;
