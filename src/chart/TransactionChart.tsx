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
  Filler,
  ScriptableContext,
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
  Filler,
);

interface TransactionChartProp {
  chartFilter:
    | 'All Time'
    | '12 Months'
    | '30 Days'
    | '7 Days'
    | '24 Hours'
    | 'custom';
}

export const TransactionChart = ({ chartFilter }: TransactionChartProp) => {
  const { userData } = useFetchUserData();

  if (!userData || userData.length === 0) {
    return (
      <div className="text-textColor text-center">
        No transaction data available
      </div>
    );
  }

  const filteredData = userData.filter((item) => {
    const transactionDate = new Date(item.date).getTime();
    const now = Date.now();

    if (chartFilter === '12 Months') {
      const oneYearAgo = now - 12 * 30 * 24 * 60 * 60 * 1000; // 12 months in milliseconds
      return transactionDate >= oneYearAgo;
    } else if (chartFilter === '30 Days') {
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      return transactionDate >= thirtyDaysAgo;
    } else if (chartFilter === '7 Days') {
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      return transactionDate >= sevenDaysAgo;
    } else if (chartFilter === '24 Hours') {
      const oneDayAgo = now - 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      return transactionDate >= oneDayAgo;
    }

    // Default to 'all'
    return true;
  });
  // Ensure userData exists and is not empty

  // Reverse the user data so the most recent transaction comes first
  const reversedData = [...filteredData].reverse();

  // Get transaction dates (formatted as YYYY-MM-DD)
  const dates = reversedData?.map((item) => {
    const date = new Date(item.date);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day < 10 ? '0' : ''}${day}-${month}-${year}`;
  });

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
    } else if (item.type.toLowerCase() === 'savings') {
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
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return; // Ensure the chart area is defined

          // Create the exact linear gradient as specified
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0.4388, 'rgba(192, 103, 230, 0.1)'); // 43.88% point
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.00)'); // 100% point (transparent)

          return gradient;
        },
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
          stepSize: 100,
          font: {
            family: primaryFont,
            size: 16,
          },
          color: 'white',
          maxTicksLimit: 6,
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
