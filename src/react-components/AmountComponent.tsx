interface AmountComponentProps {
  color?: string;
  label?: string;
  amount?: number;
}

export const AmountComponent = ({
  color = '#ffffff',
  label = 'Salary',
  amount = 5204,
}: AmountComponentProps) => {
  return (
    <div
      className="py-2 px-4 border-l border-solid w-full"
      style={{ borderColor: color }}
    >
      <div className="font-primary font-medium text-base text-secondary capitalize">
        {label}
      </div>
      <div className="font-primary font-semibold text-xl text-text">
        ₹{amount}
      </div>
    </div>
  );
};
