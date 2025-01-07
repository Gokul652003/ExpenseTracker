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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart: React.FC = () => {
  const primaryFont = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-font')
    .trim();
  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border-color')
    .trim();

  const data = {
    labels: [
      'Jan-1-2025',
      'Jan-2-2025',
      'Jan-3-2025',
      'Jan-4-2025',
      'Jan-5-2025',
      'Jan-6-2025',
      'Jan-7-2025',
      'Jan-8-2025',
      'Jan-9-2025',
      'Jan-10-2025',
      'Jan-11-2025',
      'Jan-12-2025',
      'Jan-13-2025',
      'Jan-14-2025',
      'Jan-15-2025',
      'Jan-16-2025',
      'Jan-17-2025',
      'Jan-18-2025',
      'Jan-19-2025',
      'Jan-20-2025',
      'Jan-21-2025',
      'Jan-22-2025',
      'Jan-23-2025',
      'Jan-24-2025',
      'Jan-25-2025',
      'Jan-26-2025',
      'Jan-27-2025',
      'Jan-28-2025',
      'Jan-29-2025',
      'Jan-30-2025',
      'Jan-31-2025',

      'Feb-1-2025',
      'Feb-2-2025',
      'Feb-3-2025',
      'Feb-4-2025',
      'Feb-5-2025',
      'Feb-6-2025',
      'Feb-7-2025',
      'Feb-8-2025',
      'Feb-9-2025',
      'Feb-10-2025',
      'Feb-11-2025',
      'Feb-12-2025',
      'Feb-13-2025',
      'Feb-14-2025',
      'Feb-15-2025',
      'Feb-16-2025',
      'Feb-17-2025',
      'Feb-18-2025',
      'Feb-19-2025',
      'Feb-20-2025',
      'Feb-21-2025',
      'Feb-22-2025',
      'Feb-23-2025',
      'Feb-24-2025',
      'Feb-25-2025',
      'Feb-26-2025',
      'Feb-27-2025',
      'Feb-28-2025',

      'Mar-1-2025',
      'Mar-2-2025',
      'Mar-3-2025',
      'Mar-4-2025',
      'Mar-5-2025',
      'Mar-6-2025',
      'Mar-7-2025',
      'Mar-8-2025',
      'Mar-9-2025',
      'Mar-10-2025',
      'Mar-11-2025',
      'Mar-12-2025',
      'Mar-13-2025',
      'Mar-14-2025',
      'Mar-15-2025',
      'Mar-16-2025',
      'Mar-17-2025',
      'Mar-18-2025',
      'Mar-19-2025',
      'Mar-20-2025',
      'Mar-21-2025',
      'Mar-22-2025',
      'Mar-23-2025',
      'Mar-24-2025',
      'Mar-25-2025',
      'Mar-26-2025',
      'Mar-27-2025',
      'Mar-28-2025',
      'Mar-29-2025',
      'Mar-30-2025',
      'Mar-31-2025',
    ],
    datasets: [
      {
        label: '',
        data: [
          12, 18, 24, 21, 19, 26, 15, 28, 30, 22, 27, 35, 25, 31, 29, 17, 20,
          18, 33, 36, 34, 23, 16, 30, 25, 29, 22, 27, 18, 31, 20, 25, 24, 29,
          23, 18, 21, 30, 17, 20, 27, 36, 15, 19, 22, 28, 31, 29, 34, 24, 35,
          21, 26, 23, 25, 31, 20, 27, 28, 30, 19, 33, 18, 21, 22, 29, 16, 31,
          25, 18, 34, 24, 23, 36, 17, 26, 30, 18, 28, 31, 21, 22, 24, 19, 35,
          16, 20, 29, 25, 30,
        ],
        borderColor: '#fff',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2, // Line width
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
        pointBorderColor: '#fff', // Point border color
        pointBorderWidth: 2, // Point border width
        pointRadius: 5, // Point size
        tension: 0.4, // Smooth line
        fill: 'origin',
      },
    ],
  };

  // Define chart options with enhanced styles
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to fully stretch to the container
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
            family: primaryFont, // Use the CSS variable for font-family
            size: 16, // Correct property for font size
          },
          color: 'white', // Set font color to white
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        title: {
          display: true,
          // text: 'Sales (in $)',
          font: {
            family: primaryFont, // Apply the font-family from the CSS variable
            size: 14,
            weight: 'bold',
          },
        },
        beginAtZero: false,
        ticks: {
          stepSize: 5,
          font: {
            family: primaryFont, // Use the CSS variable for font-family
            size: 16, // Correct property for font size
          },
          color: 'white', // Set font color to white
        },
        grid: {
          // offset: true,
          color: borderColor, // Change horizontal grid lines' color to red
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
          boxWidth: 0, // Removes the colored box next to the label
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

export default LineChart;
