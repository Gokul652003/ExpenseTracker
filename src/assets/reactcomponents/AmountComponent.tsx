import React from "react";

interface AmountComponentProps {
  color: string;
  label: string;
  amount: number;
}

const AmountComponent = ({
  color = "#ffffff",
  label = "Salary",
  amount = 5204,
}: AmountComponentProps) => {
  const BorderColor = {borderColor:color};
  console.log(BorderColor)
  return (
    <div>
      <div className={`py-2 px-4 border-l`} style={BorderColor}>
        <div className="font-primary font-medium text-base text-secondary">
          {label}
        </div>
        <div className="font-primary font-semibold text-xl text-text">
          ₹{amount}
        </div>
      </div>
    </div>
  );
};

export default AmountComponent;
