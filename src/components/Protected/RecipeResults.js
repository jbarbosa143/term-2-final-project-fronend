import React,{ useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import './RecipeResults.css';
import { Link } from 'react-router-dom';

function RecipeResults(props){

    const { SearchBar, searchRecipeArr } =
    useContext(SearchContext);
    console.log(searchRecipeArr);
    useEffect(() => {
    // SearchBar();

        console.log(searchRecipeArr);
    }, []); 

    
    return (
        <div className="searchContainer">

        {searchRecipeArr.map((recipes) => (
            
                <div className="searchItemContainer"key={recipes.id} >
                    <Link  to={{pathname:`/RecipeDetails/${recipes.id}`}}>
                        <h3>{recipes.title}</h3>
                        <img src={recipes.image} alt="Sorry there is currently no image for this item..." height="150px"/>
                    </Link>
                </div>
        ))}
        </div>
    );
}

export default RecipeResults;