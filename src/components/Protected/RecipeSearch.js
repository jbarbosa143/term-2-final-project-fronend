import React from 'react';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

const Actions = {
    Call_api: "call-api",
    Success:"success",
    Error: "error",
}

const searchReducer = (state, action) => {
    switch (action.type){
        case Actions.Call_api:{
            return{
                ...state,
                loading:true,
            };
        }
        case Actions.Success:{
            return{
                ...state,
                loading:false,
                search: action.data,
            };
        }
        case Actions.Error:{
            return{
                ...state,
                loading:false,
                error:null,
            };
        }
    }
};

const initialState ={
    search: [],
    loading: false,
    error:null,
};

const RecipeSearch = () => {
    const [state, dispatch] = useReducer(searchReducer,initialState);
    const {search,loading,error} = state;

    useEffect(()=> {
        dispatch({type:Actions.Call_api});
        const getSearchRecipe = async () => {
            let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${process.env.REACT_APP_COOKING_API}`
            );
            console.log(response);
            if(response.status == 200){
                dispatch({type: Actions.Success, data:response.data.recipes});
                return;
            }
            dispatch({type:Actions.Error, error:response.error});
        };
        getSearchRecipe(`${value}`);
    },[]);

    return(
        <div className="searchContainer">
        {loading ? (
            <p><Spinner/></p>
        ): error ? (
            <p>{error}</p>
        ) : (
            <div className="">
                {search.map((recipes)=>(
                    <div className='returnItem' key={recipes.id}>
                    <div className="itemTitle"><h2>{recipes.title}</h2></div>
                        </div>
                ))}
            </div>
        )}
        </div>
    );
};

export default RecipeSearch;