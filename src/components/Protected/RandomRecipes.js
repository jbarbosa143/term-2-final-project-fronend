import React from 'react';
import {  useReducer , useEffect } from "react";
import axios from 'axios';

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
            `https://api.spoonacular.com/recipes/random?number=14&tags=vegetarian,desert&apiKey=${process.env.REACT_APP_COOKING_API}`
        );
        console.log(response);
        if (response.status == 200) {
            dispatch({ type: Actions.Success, data: response.data.recipes });
            return;
        }
        dispatch({ type: Actions.Error, error: response.error });
        };
        
        getRandomRecipes();
    },[]);

    return (
        <div>
        {loading ? (
            <p>loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <ul>
            {random.map((recipes) => (
                <li key={recipes.id}>
                <h1>{recipes.title}</h1>
                <div>{recipes.image}</div>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default RandomRecipes;