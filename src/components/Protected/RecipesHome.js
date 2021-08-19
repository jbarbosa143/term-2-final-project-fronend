import React ,{ Component, useState } from 'react';
import { Link } from 'react';
import axios from 'axios';
import './RecipesHome.css';
import RandomRecipes from './RandomRecipes';
import RecipeSearch from './RecipeSearch';

function Input(initalState){
    const [value, setValue] = useState(initalState);

    function onChange(e){
        setValue(e.target.value);
    }

    function clearInput(){
        setValue("");
    }

    return [value, onChange, clearInput];
}

    function RecipesHome() {
        return (
            <div className="container">
                <div className="randomRecipes">
                    <RandomRecipes/>
                </div>
                <div className="searchBar">
                    <input type="text"/>
                    <button>Search</button>
                </div>
            </div>
        )
    };

export default RecipesHome;
