import {
    SEARCH_RECIPES,
    GET_RECIPE_DETAIL,
    SEARCH_RECIPES_DIET,
    ORDER_SCORE,
    ORDER_ALPH,
    CLEAN_DETAIL
} from './actions'



const initialState = {
    recipes: [],
    recipesDiet: [], // este lo hice para que siempre me traiga las dietas y no que busque de nuevo en el resultado
    recipeDetail: {}
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEARCH_RECIPES:
            // console.log(action.payload + 'xxxx'); **
            // if(action.payload.length === 0) alert('No se encontro nada')  **
            return { ...state, recipes: action.payload, recipesDiet: action.payload };

        case GET_RECIPE_DETAIL:
            return { recipeDetail: action.payload };

        case SEARCH_RECIPES_DIET:
            const allRecipes = state.recipesDiet;
            const dietFilter = allRecipes.filter((elem) => elem.diets.includes(action.payload))
            console.log(dietFilter + '<--' + allRecipes + '##' + action.payload);
            return { ...state, recipes: dietFilter }

        case ORDER_SCORE:
            const orderType = action.payload;
            let score;

            if (orderType === 'Asc.') {
                //console.log(action.payload);
                //console.log(state.recipes);
                //const allRecipes = state.recipes;
                score = state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1;
                    }
                    if (a.healthScore < b.healthScore) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                score = state.recipes.sort(function (a, b) {
                    if (a.healthScore < b.healthScore) {
                        return 1;
                    }
                    if (a.healthScore > b.healthScore) {
                        return -1;
                    }
                    return 0;
                });
            }
            return { ...state, recipes: score }

        case ORDER_ALPH:
            const orderAlph = action.payload;
            let alph;

            if (orderAlph === 'Asc.') {
                alph = state.recipes.sort(function (a, b) {

                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            } else {
                alph = state.recipes.sort(function (a, b) {

                    if (a.title < b.title) {
                        return 1;
                    }
                    if (a.title > b.title) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            }
            return { ...state, recipes: alph }

        case CLEAN_DETAIL:
            return { ...state, recipeDetail: {} }

        default:
            return { ...state };
    }
}

export default rootReducer;