import React from 'react';
import './TransactionList.css';

function TransactionList({ transactions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionList;
