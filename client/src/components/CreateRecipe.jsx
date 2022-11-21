/* 
Ruta de creación de recetas: debe contener

[ ] Un formulario controlado con JavaScript con los siguientes campos:
     Nombre
     Resumen del plato
     Nivel de "comida saludable" (health score)
     Paso a paso
[ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
[ ] Botón/Opción para crear una nueva receta

Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la receta no pueda contener símbolos, que el health score no pueda exceder determinado valor, etc. 
*/

import { useState } from "react"
import { useDispatch } from 'react-redux'
import { createRecipe } from "../redux/actions"
import style from '../styles/Createrecipe.module.css'
import { Link } from 'react-router-dom';

const CreateRecipe = (props) => {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: 1,
        stepToStep: [],
        image: '',
        diets: [],
    })
    //console.log(input);

    const changeHandler = (e) => {
        const property = e.target.name; //aca capturo el name del input en el que escriba
        const value = e.target.value;
        //console.log(input);
        setInput({
            ...input,
            [property]: value
        })
    }

    // LA IDEA es que cuando haga click en el boton este estado local
    // pase al estado global
    const submitHandler = (event) => {
        event.preventDefault();
        if (input.title !== '' && input.summary !== '') {

            //props.createRecipe(input);
            dispatch(createRecipe(input));

            //console.log(input.step);
            alert('Tarjeta creada con exito.!')
            setInput({
                title: '',
                summary: '',
                healthScore: 1,
                stepToStep: [],
                image: '',
                diets: [],
            });
        } else {
            alert('The title and summary fields are required.')
        }
    }


    const getSelect = (e) => {
        e.preventDefault();
        let diet1 = document.getElementById("diet1").value
        let dietsSearch = input.diets;
        console.log(dietsSearch);
        if (dietsSearch.length > 2) console.log('Solo se permiten tres dietas por receta');
        if (diet1 !== 'TipeOfDiet') {

            for (let i = 0; i < dietsSearch.length; i++) {
                if (dietsSearch[i] === diet1) {
                    console.log('Ya Existe');
                    return;
                }
            }
            setInput({
                ...input,
                diets: [...input.diets, diet1]
            })
        }
    }

    const stepHandler = (e) => {
        let step1 = document.getElementById("step1").value
        let step2 = document.getElementById("step2").value

        if (step1 !== '' && step2 !== '') {
            setInput({
                ...input,
                stepToStep: [...input.stepToStep, step1, step2]
            })

        } else if (step1 !== '' && step2 === '') {
            setInput({
                ...input,
                stepToStep: [...input.stepToStep, step1]
            })
        } else {
            setInput({
                ...input,
                stepToStep: [...input.stepToStep]
            })
        }
    }

    const newrecipeHandler = (e) => {
        //e.target.reset();
        setInput({
            title: '',
            summary: '',
            healthScore: 1,
            stepToStep: [],
            image: '',
            diets: [],
        });
        console.log('Crear nueva tarjeta...');
    }

    return (
        <div className={style.create_recipe}>

            <form onSubmit={submitHandler}>
                <label htmlFor="title">Title of recipe:</label>
                <input type="text" name="title" value={input.title} onChange={changeHandler} />

                <label htmlFor="summary">Summary:</label>
                <textarea type="text" name="summary" value={input.summary} onChange={changeHandler} />

                <label htmlFor="healthScore">HealthScore:</label>
                <input type="number" name="healthScore" value={input.healthScore} onChange={changeHandler} min="1" max="100" />

                <label htmlFor="diets">Diets:</label>
                <div>
                    <select className={style.selectordiet} id="diet1" name="diet1">
                        <option value="TipeOfDiet">Tipe of Diet</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="pescetarian">Pescetarian</option>
                        <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
                        <option value="ovo vegetarian">Ovo-Vegetarian</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="paleo">Paleo</option>
                        <option value="primal">Primal</option>
                        <option value="low FODMAP">Low FODMAP</option>
                        <option value="whole 30">Whole30</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="dairy free">Dairy Free</option>
                    </select>&nbsp;&nbsp;
                    <button className={style.button_addDiet} onClick={getSelect}>Add Diet</button>

                </div>

                <label htmlFor="image">Image:</label>
                <input type="text" name="image" value={input.image} onChange={changeHandler} />

                <label htmlFor="stepToStep">Step to Step:</label>
                <input type="text" name="step1" id="step1" placeholder="Ingrese el paso uno" />
                <input type="text" name="step2" id="step2" placeholder="Ingrese el paso dos" />

                <br />
                <div>
                    <Link to='/home'>
                        <button className={style.buttonCreate} type="text">Back to home</button>&nbsp;
                    </Link>
                    <button className={style.buttonCreate} type="submit" onClick={stepHandler}>Create Recipe</button>&nbsp;
                    <Link to='/createrecipe'>
                        <button className={style.buttonCreate} type="text" onClick={newrecipeHandler}>New Recipe</button>
                    </Link>
                </div>

            </form>
        </div>
    )
}


/* const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (data) => { dispatch(createRecipe(data)) } 
    }
} */

//export default connect(null, mapDispatchToProps)(CreateRecipe);
export default CreateRecipe;