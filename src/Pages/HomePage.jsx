
import React, { useState } from 'react'
import Filter from '../Components/Filter'
import RetreatList from '../Components/RetreatList'


const Home = () => {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')


  const handleFilter = (value) => {
    setFilter(value)
  }

  const handleSearch = (value) => {
    setSearch(value)
  }

  return (
    <div>
     
      <Filter handleFilter={handleFilter} handleSearch={handleSearch} />
      <RetreatList filter={filter} search={search} />
    </div>
  );
};

export default Home;
