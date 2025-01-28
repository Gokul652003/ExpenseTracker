import { TransactionChart } from '../chart/TransactionChart';
import { Skeleton } from '../react-components/skeleton/Skeleton';
import { useFetchUserData } from '../supabase/supabaseApis';
import { Button } from './components/Button';
import { Card } from './components/Card';

import { useState } from 'react';

export const DashBoard = () => {
  const [chartFilter, setChartFilter] = useState<
    'All Time' | '12 Months' | '30 Days' | '7 Days' | '24 Hours' | 'custom'
  >('All Time');
  const {
    totalIncome,
    totalExpense,
    totalBalance,
    loading,
    topThreeExpenseCategories,
    topThreeInomeCategories,
    topExpenceLoading,
  } = useFetchUserData();
  const timePeriods = [
    'All Time',
    '12 Months',
    '30 Days',
    '7 Days',
    '24 Hours',
  ];
  const dateFilters = ['From Date', 'To Date'];
  const a = [
    {
      category: 'income',
      totalAmount: totalIncome,
      colour: '#008000',
    },
    {
      category: 'expense',
      totalAmount: totalExpense,
      colour: '#FF0000',
    },
    {
      category: 'savings',
      totalAmount: 0,
      colour: '#FF0000',
    },
  ];
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
        {loading ? (
          <div className="flex gap-6">
            <Skeleton className="h-[294px] flex-1" />
            <Skeleton className="h-[294px] flex-1" />
            <Skeleton className="h-[294px] flex-1" />
          </div>
        ) : (
          <div className="flex gap-6 h-full">
            <Card
              type="Balance"
              amount={totalBalance}
              isLoading={loading}
              topcategory={a}
            />
            <Card
              type="Income"
              amount={totalIncome}
              isLoading={loading}
              topcategory={topThreeInomeCategories ?? []}
            />
            <Card
              type="Expense"
              amount={totalExpense}
              isLoading={loading || topExpenceLoading}
              topcategory={topThreeExpenseCategories ?? []}
            />
          </div>
        )}
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
                    isSelected={chartFilter === period}
                    onClick={() =>
                      setChartFilter(
                        period as
                          | 'All Time'
                          | '12 Months'
                          | '30 Days'
                          | '7 Days'
                          | '24 Hours'
                          | 'custom',
                      )
                    }
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
              <TransactionChart chartFilter={chartFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
