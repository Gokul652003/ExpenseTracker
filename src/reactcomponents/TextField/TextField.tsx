import React, { InputHTMLAttributes, useId } from 'react';
import { type VariantProps, cva, cx } from 'class-variance-authority';

import '../../index.css';
import styles from './TextField.module.scss';

interface InputIconProps {
  icon: React.ReactNode;
  position: 'left' | 'right';
}

const InputIcon: React.FC<InputIconProps> = ({ icon, position }) => {
  return (
    <span
      className={cx(
        styles.icon,
        position === 'left' ? styles.iconLeft : styles.iconRight,
      )}
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
    >,
    VariantProps<typeof variants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
      variant,
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
          />
          {rightIcon && <InputIcon position="right" icon={rightIcon} />}
        </div>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
