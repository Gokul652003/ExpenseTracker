interface AmountComponentProps {
  color?: string;
  label?: string;
  amount?: number | string;
}

export const AmountComponent = ({
  color,
  label,
  amount,
}: AmountComponentProps) => {
  return (
    <div
      className="py-2 px-4 border-l border-solid flex-1"
      style={{ borderColor: color }}
    >
      <div className="font-primary font-medium text-base text-secondary capitalize">
        {label}
      </div>
      <div className="font-primary font-semibold text-xl text-text">
        {amount === '---' ? amount : `₹${amount}`}
      </div>
    </div>
  );
};
