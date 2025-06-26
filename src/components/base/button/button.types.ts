export type ButtonRounding = 'rounded' | 'rectangular';

export type ButtonProps = {
  children: React.ReactNode;
  label: string;
  tooltip?: string;
  rounding?: ButtonRounding;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  disableRipple?: boolean;
  rippleClassName?: string;
};
