import React, { useEffect, useState } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import SearchBar from './components/SearchBar';
import { Pie, Bar } from 'react-chartjs-2';

import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/transactions')
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        updateChartData(data);
      });
  }, []);

  const handleAddTransaction = (newTransaction) => {
    fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    })
    .then(response => response.json())
    .then(transaction => {
      setTransactions(prev => [...prev, transaction]);
      updateChartData([...transactions, transaction]);
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateChartData = (data) => {
    const categories = [...new Set(data.map(item => item.category))];
    const amounts = categories.map(category =>
      data
        .filter(item => item.category === category)
        .reduce((acc, item) => acc + parseFloat(item.amount), 0)
    );

    setChartData({
      labels: categories,
      datasets: [
        {
          label: 'Transaction Amounts',
          data: amounts,
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
        }
      ]
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Bank Transactions</h1>
      </header>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={filteredTransactions} />
      <div className="charts">
        <div className="chart">
          <h2>Category Distribution</h2>
          <Pie data={chartData} />
        </div>
        <div className="chart">
          <h2>Transaction Amounts</h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label || ''}: ${context.raw.toFixed(2)}`
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
