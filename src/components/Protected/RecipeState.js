import React , { useState } from 'react';
import axios from 'axios';
import  { SearchContext } from '../../context/SearchContext';
import { withRouter} from 'react-router-dom';

const RecipeState = (props) => {
  const [searchRecipeArr, setSearchRecipeArr] = useState([])
  const [value, setValue] = useState("");
  const [recipeId,setRecipeId] = useState("")
// detail const------------------------------------------
  const [recipeName,setRecipeName] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [cookTime,setCookTime] = useState("");
  const [recipeSum, setRecipeSum] = useState("");
  const [ingredArr, setIngredArr] = useState("");
// -------------------------------------------------------
  async function SearchBar(e) {
    console.log(1);
    try {
      let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${process.env.REACT_APP_COOKING_API}`);
      let results = response.data.results
      if (response.status === 200) {
        setSearchRecipeArr(results)
        setRecipeId(results.id)
        console.log(response);
      }  
        } catch (e) {
            return (e)
        }
  }
    
  async function Details(recipes) {
    console.log(2);
    try {
      let details = await axios.get(`https://api.spoonacular.com/recipes/${recipes}/information?apiKey=${process.env.REACT_APP_COOKING_API}`);
        if (details.status === 200) {
        setRecipeName(details.data.title);
        setRecipeImg(details.data.image);
        setCookTime(details.data.readyInMinutes);
        setRecipeSum(details.data.summary);
        setIngredArr(details.data.extendedIngredients);
        console.log(details);
        }
    } catch (e) {
      return e;
    }
  }

    return(
        <SearchContext.Provider value={{SearchBar,value,setValue,setSearchRecipeArr,searchRecipeArr,recipeId,Details,recipeName,recipeImg,cookTime,recipeSum,ingredArr}}>
            {props.children}
        </SearchContext.Provider>

    )
}
    
    export default withRouter(RecipeState);