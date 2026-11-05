import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

