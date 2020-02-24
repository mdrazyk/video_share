import { useEffect, useState } from 'react';

const useMousePosition = () => {
  const delay = new Date().getTime() + 1000;
  const [position, setPosition] = useState({ x: 0, y: 0, delay });

  useEffect(() => {
    const setFromEvent = e => {
      setPosition({ x: e.clientX, y: e.clientY, delay });
    };
    window.addEventListener('mousemove', setFromEvent);

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  });

  return position;
};

export default useMousePosition;
