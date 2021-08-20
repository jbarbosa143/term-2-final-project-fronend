import React , { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import  { SearchContext } from '../../context/SearchContext';
import { Redirect ,withRouter} from 'react-router-dom';

const RecipeState = (props) => {
    const [searchRecipeArr, setSearchRecipeArr] = useState([])
    const [value, setValue] = useState("");
    // -------------------------------------------------------
    async function SearchBar(e) {
        

        try {
            console.log(12123124);
            let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${process.env.REACT_APP_COOKING_API}`
            );
                console.log(response);
                setValue("")
                let results = response.data.results
                if (response.status === 200) {
                setSearchRecipeArr(results)
                console.log(results);
                }  
        } catch (e) {}
    }
    
    return(
        <SearchContext.Provider value={{SearchBar,value,setValue,setSearchRecipeArr,searchRecipeArr}}>
            {props.children}
        </SearchContext.Provider>
    )
}
    
    export default withRouter(RecipeState);