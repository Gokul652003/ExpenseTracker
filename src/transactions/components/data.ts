export const transactionTableData = [
  {
    id: '1',
    date: '2025-01-12',
    category: 'Groceries',
    amount: 50.25,
    type: 'Expense',
    notes: 'Bought vegetables and fruits',
  },
  {
    id: '2',
    date: '2025-01-11',
    category: 'Groceries',
    amount: 1500.0,
    type: 'Income',
    notes: 'Monthly salary credited',
  },
  {
    id: '3',
    date: '2025-01-10',
    category: 'Transport',
    amount: 20.0,
    type: 'Expense',
    notes: 'Cab to office',
  },
  {
    id: '4',
    date: '2025-01-09',
    category: 'Dining',
    amount: 35.75,
    type: 'Expense',
    notes: 'Dinner at a restaurant',
  },
  {
    id: '5',
    date: '2025-01-08',
    category: 'Freelance',
    amount: 200.0,
    type: 'Income',
    notes: 'Payment for freelance project',
  },
];

// export const formattedTransactionTableData = transactionTableData.map(
//   (transaction) => ({
//     ...transaction,
//     date: new Date(transaction.date).toLocaleDateString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     }),
//   }),
// );
