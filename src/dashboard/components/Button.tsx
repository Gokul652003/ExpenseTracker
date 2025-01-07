import React, { MouseEventHandler } from 'react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isSelected?: boolean;
}

export const Button = ({
  text,
  prefixIcon,
  suffixIcon,
  isSelected,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={`px-4 py-2 rounded-lg flex gap-1.5 ${isSelected ? 'border border-textColor' : 'border border-border'}`}
      onClick={onClick as unknown as MouseEventHandler<HTMLDivElement>}
    >
      {prefixIcon && <span>{prefixIcon}</span>}
      <span
        className={`text-base font-medium ${isSelected ? 'text-textColor' : 'text-secondary'}`}
      >
        {text}
      </span>
      {suffixIcon && <span>{suffixIcon}</span>}
    </div>
  );
};
