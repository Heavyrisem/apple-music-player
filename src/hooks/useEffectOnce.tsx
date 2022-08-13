import React, { useEffect, useState } from 'react';

const useEffectOnce = (effect: () => void) => {
  const [hasRun, setHasRun] = useState(false);
  useEffect(() => {
    if (!hasRun) {
      effect();
      setHasRun(true);
    }
  }, [effect, hasRun]);
};

export default useEffectOnce;
