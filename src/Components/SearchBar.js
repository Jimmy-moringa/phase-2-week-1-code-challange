import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search transactions"
      onChange={(e) => onSearch(e.target.value)}
      style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
    />
  );
}

export default SearchBar;
