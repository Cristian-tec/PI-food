/* 
Aca debo mostrar:
[ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
[ ] Resumen del plato
[ ] Nivel de "comida saludable" (health score)
[ ] Paso a paso
*/

import React from 'react'
import { Link } from 'react-router-dom';
import style from '../styles/Recipe.module.css'

import { deleteRecipe } from '../redux/actions'
import { useDispatch } from 'react-redux'

const Recipe = (props) => {

    const dispatch = useDispatch();

    const int = () => {
        let size = props.id.length;
        if (size > 10) {
            return (
                <>
                    <button className={style.borrar} onClick={() => deleteHandler(props.id)}>Delete</button>&nbsp;
                    <button className={style.borrar} >Edit</button>
                </>
            )
        }
    }

    const deleteHandler = (recibe) => {
        console.log(recibe)
        dispatch(deleteRecipe(recibe))
    }

    return (

        <div className={style.recipe}>
            <Link to={`/recipedetail/${props.id}`}>
                <h2 className={style.title}>{props.title}</h2>
            </Link>
            <div className={style.image_contain}>
                <img className={style.image} src={props.image} alt={props.title} />
            </div>
        
            <h4>Health Score: {props.healthScore}</h4>
            <h4>Tipe of diet:</h4>
            <div className={style.diets_contain}>
                <h4>{props.diets?.join(' | ')}</h4>
            </div>

            <div>{int()}</div>

        </div>

    )
}

export default Recipe;






































