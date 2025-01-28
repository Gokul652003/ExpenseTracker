import { cx } from 'class-variance-authority';

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cx('animate-pulse bg-tableBgDark rounded-md', className)}
    {...props}
  />
);
