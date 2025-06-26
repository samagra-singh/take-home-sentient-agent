'use client';

import clsx from 'clsx';
import { useCallback } from 'react';

export interface ToggleSwitchProps {
  value: string;
  options: [string, string];
  onChange: (value: string) => void;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const [option1, option2] = options;
  const isFirstSelected = value === option1;
  const isSecondSelected = value === option2;

  const handleClick = useCallback((selectedValue: string) => {
    if (selectedValue !== value) {
      onChange(selectedValue);
    }
  }, [value, onChange]);

  return (
    <div
      className={clsx(
        'relative inline-flex items-center bg-surface-model-toggle rounded-full py-1 transition-all duration-200 ease-in-out cursor-pointer',
        className,
      )}
    >
      {/* Sliding white background */}
      <div
        className={clsx(
          'absolute top-1 bottom-1 bg-surface-global rounded-full transition-all duration-200 ease-in-out shadow-sm',
          {
            'left-1 right-1/2': isFirstSelected,
            'left-1/2 right-1': isSecondSelected,
          },
        )}
      />

      <button
        type="button"
        className={clsx(
          'relative z-10 px-7 py-1 rounded-full font-model-toggle transition-colors duration-200 ease-in-out',
          {
            'text-chat-input-light hover:text-chat-input-dark cursor-pointer': !isFirstSelected,
          },
        )}
        onClick={() => handleClick(option1)}
      >
        {option1}
      </button>

      <button
        type="button"
        className={clsx(
          'relative z-10 px-7 py-1 rounded-full font-model-toggle transition-colors duration-200 ease-in-out',
          {
            'text-chat-input-light hover:text-chat-input-dark cursor-pointer': !isSecondSelected,
          },
        )}
        onClick={() => handleClick(option2)}
      >
        {option2}
      </button>
    </div>
  );
};

export default ToggleSwitch;
