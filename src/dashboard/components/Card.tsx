import { AmountComponent } from '../../react-components/AmountComponent';
import lodingGif from '@/assets/loading-gif.gif';

interface CardProp {
  type: 'Income' | 'Balance' | 'Expense';
  amount: number;
  isLoading?: boolean;
}

export const Card = ({ type, amount, isLoading }: CardProp) => {
  return (
    <div className="p-6 flex flex-col gap-9 h-full border border-border rounded-2xl justify-center flex-1">
      <div className="flex justify-between text-secondary text-sm font-normal">
        <p>{type}</p>
        <p>All Time</p>
      </div>
      <div>
        <p className="text-secondary font-base">
          {type === 'Balance'
            ? 'Current Balance'
            : type === 'Income'
              ? 'Total Income'
              : 'Total Expense'}
        </p>
        {isLoading ? (
          <p className="">
            <img src={lodingGif} className="size-10 " />
          </p>
        ) : (
          <p className="text-textColor text-[40px]">₹{amount}</p>
        )}
      </div>
      <div className="flex">
        <AmountComponent label="income" amount={254785} color="#ACDE49" />
        <AmountComponent label="income" amount={254785} color="#9D35A3" />
        <AmountComponent label="income" amount={254785} color="#AC6F6F" />
      </div>
    </div>
  );
};
