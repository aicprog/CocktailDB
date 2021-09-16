import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()



const AppProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback (async() =>{
    try{
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const {drinks} = data

      if (drinks){
        const newCocktails = drinks.map((item) =>{
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item
          return{
            id: idDrink, 
            name: strDrink, 
            image: strDrinkThumb, 
            info: strAlcoholic, 
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
        setLoading(false)
      }else{
        setCocktails([])
        setLoading(false)
      }
     
      
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchData()
  }, [searchTerm, fetchData])


  return <AppContext.Provider 
          value = {{cocktails, setCocktails, 
                    searchTerm, setSearchTerm, 
                    loading, setLoading
                  }}>
          {children}
        </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
