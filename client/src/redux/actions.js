import axios from "axios"

export const SEARCH_RECIPES = 'GET_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';

export const SEARCH_RECIPES_DIET = 'GET_RECIPES_DIET';
export const ORDER_SCORE = 'ORDER_SCORE';
export const ORDER_ALPH = 'ORDER_ALPH';

export const CLEAN_DETAIL = 'CLEAN_DETAIL';


export const APIKEY = 'a45dec4b0fed478c813424d93c4332ad'
// --> API KEY 2 :  f1d2428c5e144dcab5123469d0541c8a

export const searchRecipes = (recipe) => {

    return async function (dispatch) {
        await fetch(`http://localhost:3001/recipes?title=${recipe}`)
            .then(response => response.json())
            .then(data => dispatch({ type: SEARCH_RECIPES, payload: data }))
    }
}


// https://api.spoonacular.com/recipes/complexSearch?apiKey=a45dec4b0fed478c813424d93c4332ad&addRecipeInformation=true&query=carne


//let data = { title: 'arroz con pollo', summary: 'cocinar luego comer' }

export const createRecipe = (input) => {
    console.log(input);
    return async function () {
        await axios.post('http://localhost:3001/recipes', input)
    }
}

/* export const getRecipeDetail = (id) => {
    console.log(id);
    return function (dispatch) {
         axios(`http://localhost:3001/recipes/${id}`)
            .then(response => dispatch({ type: GET_RECIPE_DETAIL, payload: response.data }))
    }
} */

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        await fetch(`http://localhost:3001/recipes/${id}`)
            .then(response => response.json())
            .then(data => dispatch({ type: GET_RECIPE_DETAIL, payload: data }))
    }
}

export const searchRecipesDiet = (diet) => {
    return {
        type: SEARCH_RECIPES_DIET,
        payload: diet,
    }
}

export const orderScore = (order) => {
    return {
        type: ORDER_SCORE,
        payload: order
    }
}

export const orderAlph = (order) => {
    return {
        type: ORDER_ALPH,
        payload: order
    }
}

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
}