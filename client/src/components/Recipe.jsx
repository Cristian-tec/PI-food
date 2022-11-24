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

const Recipe = (props) => {

    const int = () => {
        let size = props.id.length;
        if (size > 10) {
            return (
                <>
                    <button onClick={() => deleteHandler(props.id)}>Borrar</button>
                </>
            )
        }
    }

    const deleteHandler = (recibe) => {
        console.log(recibe)
    }

    return (

        <div className={style.recipe}>
            <Link to={`/recipedetail/${props.id}`}>
                <h2 className={style.title}>{props.title}</h2>
            </Link>
            <img src={props.image} alt={props.title} />
            <h4>Health Score: {props.healthScore}</h4>
            <h4>Tipe of diet:</h4>
            <h4>{props.diets?.join(' | ')}
            </h4>
            {<div>{int()}</div>}
        </div>

    )
}

export default Recipe;






































