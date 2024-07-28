import React from 'react';

const Filter = ({ handleFilter, handleSearch }) => {
  return (
    <div className="p-4">
      <input 
        type="text" 
        placeholder="Search by title" 
        onChange={e => handleSearch(e.target.value)} 
        className="border p-2 w-full mb-4 outline-none border-blue-500 rounded focus:ring-1 ring-blue-500"
      />
      <select onChange={e => handleFilter(e.target.value)} className="border p-2 w-full border-blue-400 rounded outline-none focus:ring-1 ring-blue-500">
        <option value="">All Types</option>
        <option value="Yoga">Yoga</option>
        <option value="Meditation">Meditation</option>
        <option value="Detox">Detox</option>
      </select>
    </div>
  );
};

export default Filter;
