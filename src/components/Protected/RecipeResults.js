import React,{ useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import './RecipeResults.css';

function RecipeResults(props){

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
                <h3>{recipes.title}</h3>
                <img src={recipes.image} alt="Sorry there is currently no image for this item..." height="150px"/>
                
            </div>
        ))}
        </div>
    );
    
}

export default RecipeResults;