import React, { InputHTMLAttributes, useId } from 'react';
import { type VariantProps, cva, cx } from 'class-variance-authority';

import '../../index.css';
import styles from './TextField.module.scss';

interface InputIconProps {
  icon: React.ReactNode;
  position: 'left' | 'right';
  onClick?: () => void;
}

const InputIcon: React.FC<InputIconProps> = ({ icon, position, onClick }) => {
  return (
    <span
      className={cx(
        styles.icon,
        position === 'left' ? styles.iconLeft : styles.iconRight,
      )}
      onClick={onClick}
    >
      {icon}
    </span>
  );
};

const variants = cva(styles.container, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextFieldProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'type'
      | 'disabled'
      | 'required'
      | 'value'
      | 'onChange'
      | 'onBlur'
      | 'name'
      | 'placeholder'
      | 'maxLength'
      | 'inputMode'
      | 'onKeyDown'
      | 'onPaste'
      | 'defaultValue'
    >,
    VariantProps<typeof variants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconOnClick?: () => void;
  label?: string;
  description?: string;
}

export type Variant = TextFieldProps['variant'];

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      description,
      disabled,
      label,
      leftIcon,
      required,
      rightIcon,
      rightIconOnClick,
      variant,
      defaultValue,
      ...rest
    },
    ref,
  ) => {
    const REQUIRED_ASTERISK = '*';

    const labelText = required ? `${label}${REQUIRED_ASTERISK}` : label;

    const inputID = useId();

    return (
      <div className={variants({ variant })} aria-disabled={disabled}>
        {label && (
          <label
            aria-disabled={disabled}
            className={styles.label}
            data-testid="text-field-label"
            htmlFor={inputID}
          >
            {labelText}
          </label>
        )}
        <div className={styles.inputContainer} aria-disabled={disabled}>
          {leftIcon && <InputIcon position="left" icon={leftIcon} />}
          <input
            {...rest}
            className={styles.input}
            disabled={disabled}
            ref={ref}
            required={required}
            id={inputID}
            defaultValue={defaultValue}
          />
          {rightIcon && (
            <InputIcon
              position="right"
              icon={rightIcon}
              onClick={rightIconOnClick}
            />
          )}
        </div>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
