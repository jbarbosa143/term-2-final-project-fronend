import React,{ useContext, useEffect }from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = (props)=>{
    let { recipes } = useParams();
    const {Details} = useContext(SearchContext);
    const {recipeName} = useContext(SearchContext)
    const {recipeImg} = useContext(SearchContext);
    const {cookTime} = useContext(SearchContext);
    const {recipeSum} = useContext(SearchContext);
    const {ingredArr} = useContext(SearchContext);

let renderIngredArr;
if(ingredArr){
    renderIngredArr = ingredArr.map((item)=>(
        <ul key={item.id}>
            <li>{item.name}</li>
                <br/>
            <li>{item.original}</li>
        </ul>
    ))
    };
    
    useEffect(() => {
        Details(recipes);
    }, [])
    
    return(
        <div className="detailContainer">
            <div className="basicInfo">
                <h1>{recipeName}</h1>
                <img src={recipeImg}/>
                <p>Cook Time: {cookTime} Minutes</p>
                <div className="summary">
                    <p>{recipeSum}</p>
                </div>
            </div>
            <div className="ingred">
                <div className="ingredHeader">  
                    <h3>Ingrediants</h3>
                </div>
                <div className="ingredList">
                    {renderIngredArr}
                </div>
            </div>
            

        </div>
    )
    
}
export default RecipeDetails;