import React from 'react';
import {  useReducer , useEffect } from "react";
import axios from 'axios';
import './RandomRecipes.css';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

const Actions = {
    Call_api: "call-api",
    Success: "success",
    Error: "error",
    };

const randomReducer = (state, action) => {
  switch (action.type) {
    case Actions.Call_api: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.Success: {
      return {
        ...state,
        loading: false,
        random: action.data,
      };
    }
    case Actions.Error: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  }
};

const initialState = {
  random: [],
  loading: false,
  error: null,
};


  const RandomRecipes = () => {
  const [state, dispatch] = useReducer(randomReducer, initialState);
  const { random, loading, error } = state;

  useEffect(() => {
    dispatch({ type: Actions.Call_api });
      const getRandomRecipes = async () => {
      let response = await axios.get(
        `https://api.spoonacular.com/recipes/random?number=5&tags=vegetarian,desert&apiKey=${process.env.REACT_APP_COOKING_API}`
      );
        if (response.status == 200) {
            dispatch({ type: Actions.Success, data: response.data.recipes });
            return;
        }
        dispatch({ type: Actions.Error, error: response.error });
        };
        
        getRandomRecipes();
    },[]);

    return (
      <div className="itemsContainer">
        {loading ? (
          <p><Spinner/></p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="randoContainer">
            {random.map((recipes) => (
              <div className="itemContainer" key={recipes.id}>
                <Link  to={{pathname:`/RecipeDetails/${recipes.id}`}}>
                  <div className="itemHeader" >
                  <h5>{recipes.title}</h5>
                  </div>
                  <img src={recipes.image} alt="oops!, There Seems To Be No Image For this Item... Sorry For the incoveniance" height="100px"/>
                  <p>Required Time: {recipes.readyInMinutes} Minutes</p>
                  <p>Likes: {recipes.aggregateLikes}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default RandomRecipes;