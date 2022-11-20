import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Recipe from '../components/Recipe'

const Recipes = (props) => {
    // if (props.recipes.results) console.log(props.recipes.results[0]);
    console.log(props);
    return (
        <>
            <h2>Componente RecipeS</h2>
            {
                props.recipes?.map(elem => <Recipe
                    title={elem.title}
                />)

            }

        </>
    )
}

const mapsStateToProps = (state) => {
    return {
        recipes: state.recipes // para acceder por props seria props.recipes
    }
}

/* const mapDispatchToProps = (dispatch) => {
    return {
        searchRecipes: (param) => { dispatch(searchRecipes(param)) } //para acceder props.getUsers
    }
} */

export default connect(mapsStateToProps, null)(Recipes);
//export default connect(mapsStateToProps, mapDispatchToProps)(Recipes);