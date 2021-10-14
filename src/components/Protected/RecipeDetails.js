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
    const {ingredSteps} = useContext(SearchContext)

let renderIngredArr;
    if(ingredArr){
        renderIngredArr = ingredArr.map((item)=>(
        <ul key={item.id}>
            {/* <li>{item.name}</li>
                <br/> */}
            <li>{item.original}</li>
        </ul>
        ))
    };

let renderSteps;
    if(ingredSteps){
        renderSteps = ingredSteps.steps.map((items)=>{
            return(
                <ul> 
                    <li>{items.step}</li>
                </ul>
                
                )
        })
    }

let newRecipeSum = recipeSum.replace(/<b>|<\/b>/g, "");

    useEffect(() => {
        Details(recipes);
    }, [])
    console.log(recipeSum);
    return(
        <div className="detailContainer">
            <div className="basicInfo">
                <h2>{recipeName}</h2>
                <img src={recipeImg} height='250px'/>
                <p>Cook Time: {cookTime} Minutes</p>
                <h3>Summary:</h3>
            <div className="summary">
                    <p>{newRecipeSum}</p>
            </div>
            </div>
            <div className='instContainer'>
                <div className="ingred">
                    
                        <div className="ingredHeader">  
                            <h2>Ingrediants</h2>
                        </div>
                        <div className="ingredList">
                            {renderIngredArr}
                        </div>
                    
                </div>
                <div className='instructions'>
                    <h2>Instructions</h2>
                        {renderSteps}
                </div>
            </div>    
        </div>
    )
    
}
export default RecipeDetails;
