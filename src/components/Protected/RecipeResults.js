import React,{ useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useParams } from "react-router-dom";

function RecipeResults(props){
    let { recipes } = useParams();

    const { SearchBar, value, setValue,setSearchRecipeArr,searchRecipeArr } = useContext(SearchContext);
    console.log(searchRecipeArr);
    useEffect(() => {
        SearchBar()
        console.log();
    }, [])

return(
    <div className="container">
        <div className="resultsContainer">
            
        </div>
    </div>
)

}

export default RecipeResults;