'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';

import { TooltipIds } from '@/utils/constants/global';

import {
  type ButtonProps,
} from './button.types';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Normally, a button would manage its own variants, sizes, etc.
 * Figma designs have a very wide variety of buttons, and not consistent either.
 * Due to the specs, all consumers will manage the button and it's children's styling.
 *
 * This is a basic button component that:
 * - Handles rounding.
 * - Handles tooltip and aria-label.
 * - Handles ripple effect.
 * - Handles disabled state in an accessible way
 * - Handles click and keyboard events.
 */
const Button = ({
  children,
  label,
  tooltip, // Optional
  rounding = 'rounded',
  disabled = false,
  className = '',
  onClick, // Optional
  disableRipple = false,
  rippleClassName = 'bg-ripple-default',
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  const createRipple = (
    clickCoords?: { clickX: number, clickY: number },
  ) => {
    if (disableRipple || !buttonRef.current) {
      return;
    }

    let centerX = 0;
    let centerY = 0;
    if (!clickCoords) {
      const rect = buttonRef.current.getBoundingClientRect();

      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    }
    const { clickX, clickY } = clickCoords ?? { clickX: centerX, clickY: centerY };

    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const rippleX = clickX - rect.left - size / 2;
    const rippleY = clickY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x: rippleX,
      y: rippleY,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600); // Sync with `global.css`.
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Called using keyboard space or enter
    if (event.clientX === 0 && event.clientY === 0) {
      createRipple();
    } else {
      createRipple({ clickX: event.clientX, clickY: event.clientY });
    }

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      className={clsx(
        'relative overflow-hidden',
        className,
        {
          'rounded-full': rounding === 'rounded',
          'rounded-md': rounding === 'rectangular',
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
        },
      )}
      onClick={handleClick}
      // onKeyUp={handleKeyUp}
      aria-disabled={disabled}
      aria-label={label}
      data-tooltip-id={TooltipIds.CLICKABLE_NO_FOCUS}
      data-tooltip-content={tooltip ?? label}
    >
      {children}
      {!disabled && !disableRipple && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={clsx(
            'absolute pointer-events-none rounded-full animate-ripple',
            rippleClassName,
          )}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
          } as React.CSSProperties}
        />
      ))}
    </button>
  );
};

export default Button;
