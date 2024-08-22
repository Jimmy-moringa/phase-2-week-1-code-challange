import React, { useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction(formData);
    setFormData({ date: '', description: '', category: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <input name="description" type="text" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="category" type="text" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
