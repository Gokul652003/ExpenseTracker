import { TransactionChart } from '../chart/TransactionChart';
import { useFetchUserData } from '../supabase/supabaseApis';
import { Button } from './components/Button';
import { Card } from './components/Card';

import { useState } from 'react';

export const DashBoard = () => {
  const [selectedItem, setSelectedItem] = useState<string>('All');
  const { totalIncome, totalExpense, totalBalance, loading } =
    useFetchUserData();
  const timePeriods = [
    'All Time',
    '12 Months',
    '30 Days',
    '7 Days',
    '24 Hours',
  ];
  const dateFilters = ['From Date', 'To Date'];
  // console.log(sortedCategories);
  return (
    <div>
      <div className="p-8 flex flex-col gap-2 border border-border">
        <span className="text-textColor text-[44px] font-medium">
          Dashboard
        </span>
        <span className="text-base text-secondary font-normal">
          Get a quick snapshot of your balance, income, expenses, and savings to
          stay on top of your financial goals.
        </span>
      </div>
      <div className="p-8 flex flex-col gap-[52px]">
        <div className="flex gap-6">
          <Card type="Balance" amount={totalBalance} isLoading={loading} />
          <Card type="Income" amount={totalIncome} isLoading={loading} />
          <Card type="Expense" amount={totalExpense} isLoading={loading} />
        </div>
        <div className="flex flex-col gap-9">
          <div className="p-8 flex flex-col gap-2">
            <span className="text-textColor text-4xl font-medium">
              Financial Overview
            </span>
            <span className="text-base text-secondary font-normal">
              Visualize the relationship between your income, expenses, and
              balance over time to track your financial progress and make better
              budgeting decisions.
            </span>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex gap-6 justify-end">
              {/* Time Period Buttons */}
              <div className="flex gap-5">
                {timePeriods.map((period) => (
                  <Button
                    key={period}
                    text={period}
                    isSelected={selectedItem === period}
                    onClick={() => setSelectedItem(period)}
                  />
                ))}
              </div>
              {/* Date Filter Buttons */}
              <div className="flex gap-6">
                {dateFilters.map((filter) => (
                  <Button key={filter} text={filter} />
                ))}
              </div>
            </div>
            <div>
              {/* <TransactionChart /> */}
              <TransactionChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
