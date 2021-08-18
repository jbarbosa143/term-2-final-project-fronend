import React ,{ Component } from 'react';
import { Link } from 'react';
import axios from 'axios';
import './RecipesHome.css';
import RandomRecipes from './RandomRecipes';


    function RecipesHome() {
        return (
            <div className="container">
                <div className="randomRecipes">
                    <h1>Add Random Recipes here</h1>
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
