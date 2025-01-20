import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { useFetchUserData } from '../supabase/supabaseApis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const TransactionChart: React.FC = () => {
  const { userData } = useFetchUserData();

  // Ensure userData exists and is not empty
  if (!userData || userData.length === 0) {
    return <div>No transaction data available</div>;
  }

  // Reverse the user data so the most recent transaction comes first
  const reversedData = [...userData].reverse();

  // Get transaction dates (formatted as YYYY-MM-DD)
  const dates = reversedData?.map(
    (item) => new Date(item.date).toISOString().split('T')[0],
  );

  // Initialize variables for cumulative amount
  let cumulativeAmount = 0;
  const cumulativeData: number[] = [];

  // Iterate through the reversed user data to calculate the cumulative amounts
  reversedData?.forEach((item) => {
    const amount = parseFloat(item.amount); // Ensure the amount is a number

    // Check if the type is 'income' or 'expense' and adjust cumulativeAmount accordingly
    if (item.type.toLowerCase() === 'income') {
      cumulativeAmount += amount; // Add to cumulative amount for income
    } else if (item.type.toLowerCase() === 'expense') {
      cumulativeAmount -= amount; // Subtract from cumulative amount for expense
    }

    // Store the cumulative amount at each step
    cumulativeData.push(cumulativeAmount);
  });

  const primaryFont = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-font')
    .trim();
  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border-color')
    .trim();

  const data = {
    labels: dates, // Use formatted transaction dates
    datasets: [
      {
        label: 'Cumulative Amount (Income & Expense)',
        data: cumulativeData, // Use cumulative data for the chart
        borderColor: '#fff',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(47, 47, 47, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.5,
        fill: 'origin',
      },
    ],
  };

  // Define chart options with enhanced styles
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          font: {
            family: 'var(--primary-font)', // Apply the font-family from the CSS variable
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          display: true,
          font: {
            family: primaryFont,
            size: 16,
          },
          color: 'white',
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        title: {
          display: true,
          font: {
            family: primaryFont,
            size: 14,
            weight: 'bold',
          },
        },
        beginAtZero: false,
        ticks: {
          stepSize: 5,
          font: {
            family: primaryFont,
            size: 16,
          },
          color: 'white',
        },
        grid: {
          color: borderColor,
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 0,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
};
