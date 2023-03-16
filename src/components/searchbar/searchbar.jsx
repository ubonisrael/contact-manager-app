import React from 'react'
import './searchbar.css'

const Searchbar = ({search, handleSearch}) => {
  return (
    <div className='searchbar_container'>
        <input id='search' className='search' type='text' value={search} onChange={handleSearch} placeholder='Search Contacts.....' />
    </div>
  )
}

export default Searchbar