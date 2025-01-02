import React from "react";

const AmountComponent = ({ color = "white",label = "Salary",amount = 5204}) => {
  return (
    <div>
      <div className={`py-2 px-4 border-l ${color?`border-${color}`:'border-black'}`}>
        <div className="font-primary font-medium text-base leading-[19.2px] text-secondary">{label}</div>
        <div className="font-primary font-semibold text-xl leading-6 text-text">₹{amount}</div>
      </div>
    </div>
  );
};

export default AmountComponent;
