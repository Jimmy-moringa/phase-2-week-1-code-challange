import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by description..."
    />
  );
}

export default SearchBar;
