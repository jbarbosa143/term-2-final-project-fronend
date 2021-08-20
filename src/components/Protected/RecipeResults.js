import React,{ useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useParams } from "react-router-dom";
import './RecipeResults.css';

function RecipeResults(props){
    // let { recipes } = useParams();

    const { SearchBar, value, setValue, setSearchRecipeArr, searchRecipeArr } =
    useContext(SearchContext);
    console.log(searchRecipeArr);
    useEffect(() => {
    SearchBar();

        console.log(searchRecipeArr);
    }, []); 

    return (
      <div className="searchContainer">
        {searchRecipeArr.map((recipes) => (
          <div className="searchItemContainer" key={recipes.id}>
            {recipes.title}
          </div>
        ))}
      </div>
    );
    
}

export default RecipeResults;