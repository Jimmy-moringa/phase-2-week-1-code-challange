import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import TransactionForm from './Components/TransactionForm';
import TransactionList from './Components/TransactionList';
import './App.css';
function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Transaction Manager</h1>
      <SearchBar onSearch={setSearchTerm} />
      <TransactionForm onAddTransaction={addTransaction} />
      <TransactionList transactions={filteredTransactions} onDeleteTransaction={deleteTransaction} />
    </div>
  );
}

export default App;
