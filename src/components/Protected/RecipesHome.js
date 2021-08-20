import React ,{ Component, useState, useEffect, useContext } from 'react';
import { Link } from 'react';

import axios from 'axios';
import './RecipesHome.css';
import RandomRecipes from './RandomRecipes';
import { SearchContext } from '../../context/SearchContext';

import RecipeResults from './RecipeResults';


function RecipesHome() {
    const {SearchBar,value,setValue} = useContext(SearchContext)

        return (
            <div className="container">
                <div className="searchBar">
                    <input type="text" placeholder="Search Recipe Here"  onChange={(e)=> setValue(e.target.value)}/>
                    <button type="submit" onClick={(e)=> SearchBar(e)}>Search</button>
                </div>
                <div className="randomRecipes">
                    <RandomRecipes/>
                </div>
                <hr/>
                <div className="searchResults">
                    <RecipeResults/>
                </div>
            </div>
        )    
};

export default RecipesHome;
