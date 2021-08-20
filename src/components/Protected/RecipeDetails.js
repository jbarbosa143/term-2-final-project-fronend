import React from 'react';
import axios from 'axios';




async function RecipeDetails(e){
    try{
        let details = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}}/information?apiKey=${process.env.REACT_APP_COOKING_API}`
        );
        let info = response.data.results
        if(response.status === 200){

        }
    }catch (e){
        return (e);
    }
    // return statment here
}

export default RecipeDetails;