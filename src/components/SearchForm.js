import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {searchTerm, setSearchTerm} = useGlobalContext()

    const getSearchTerm = (e) =>{
      const newSearch = e.target.value
      setSearchTerm(newSearch)
    }

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  return (
    
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text" name="name" id="name" value={searchTerm} onChange={getSearchTerm}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
