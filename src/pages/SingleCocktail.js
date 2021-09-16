import React, {useState, useEffect, } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [currentCocktail, setCurrentCocktail] = useState(null)
  const [loading, setLoading] = useState(true)
  const {id} = useParams()

  const fetchCocktail = async() =>{
    try{
      const response = await fetch(`${url}${id}`)
      const cocktail = await response.json()
      if (cocktail.drinks){
        const {
          strDrink: title, 
          strDrinkThumb: image, 
          strAlcoholic: info, 
          strCategory: category, 
          strGlass: glass, 
          strInstructions: instructions, 
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        
        } = cocktail.drinks[0]

        const ingredients = [          
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]

        const newCocktail = {
        title, image, info, category, glass, instructions, ingredients
      }

      setCurrentCocktail(newCocktail)
      setLoading(false)
      }

      else{
        setCurrentCocktail(null)
        setLoading(false)
      }

    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCocktail()
  }, [id])

    if (loading){
      return <Loading/>
    }

    if(!currentCocktail){
      return <h2 className="section-title">no cocktails to display</h2>
    }

    const {title, image, category, info, glass, instructions, ingredients} = currentCocktail
  return (

    <section className="section cocktail-section">
      <Link className="btn btn-primary" to="/">back home</Link>
      <h2 className="section-title">{title}</h2>
      <div className="drink">
        <img src={image} alt={image}/>
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span> {title}
          </p>
          <p>
            <span className="drink-data">category: </span> {category}
          </p>
          <p>
            <span className="drink-data">info: </span> {info}
          </p>
          <p>
            <span className="drink-data">glass: </span> {glass}
          </p>
          <p>
            <span className="drink-data">instruction: </span> {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span> 
            {
              ingredients.map((item, index) =>{
                return (
                  item ? <span key={index}>{item}</span> : null
                )
              })
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
