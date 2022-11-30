import React from 'react'
import { useState } from "react"
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { searchRecipes, searchRecipesDiet, orderScore, orderAlph } from '../redux/actions'
import style from '../styles/Home.module.css'
import Recipe from './Recipe'
import Paginado from './Paginado'


const Home = (props) => {

    const [input, setInput] = useState(
        {
            title: '',
            diets: '',
            orderS: '',
            orderA: ''
        }
    );

    // const recipes = useSelector((state) => state.recipes)
    const dispatch = useDispatch();

    // ---------  PAGINADO -----------------------

    const allRecipes = useSelector((state) => state.recipes);  // 100 de la API + las de la BBDD
    //console.log(allRecipes + 'antes');
    const [currentPage, setCurrentPage] = useState(1);        //
    const recipesPerPage = 9;
    const last = currentPage * recipesPerPage; //   1 * 9  -----> Last  9
    const first = last - recipesPerPage;       //  9  - 9  -----> First 0
    const currentRecipes = allRecipes?.slice(first, last);

    const paginado = (pageNumber) => {  // esto me ayuda al renderizado
        setCurrentPage(pageNumber)
    }

    // --------- FIN PAGINADO -------------------

    useEffect(() => {
        dispatch(searchRecipes(''));
    }, [dispatch])


    const changeHandler = (e) => {
        // console.log(value);
        const property = e.target.name; //aca capturo el name del input en el que escriba
        const value = e.target.value;
        setInput({ ...input, [property]: value })
    }

    const searchHandler = (event) => {
        console.log(input.title);
        dispatch(searchRecipes(input.title));
        //console.log(input);
    }

    const buttonFilter = (e) => {
        //console.log(input.diets);
        if (input.diets === 'TipeOfDiet') return;
        dispatch(searchRecipesDiet(input.diets))
    }

    const refreshHandler = (e) => {
        dispatch(searchRecipes(''))
    }

    const scoreHandler = (e) => {
        dispatch(orderScore(e.target.value))
        setInput({ ...input, orderS: e.target.value })
    }

    const alphHandler = (e) => {
        dispatch(orderAlph(e.target.value))
        setInput({ ...input, orderA: e.target.value })
    }

    /*     const mostrar = () => {
            if (allRecipes.length > 0) {
                return (
                    <Paginado
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes?.length}  // ESTE PUTO SIGNO ACA ME RESOLVIO TODO EL PROBLEMA !!!!
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                )
            }
        } */

    return (
        <div className={style.containerhome}>
            <nav className={style.navbar}>
                <button className={style.botonrefresh} onClick={refreshHandler}>Refresh</button>&nbsp;&nbsp;&nbsp;
                <input className={style.inputtext} type="text" name="title" value={input.title} onChange={changeHandler} />&nbsp;

                <button className={style.botonsearch} id='search' onClick={searchHandler}>Search</button>&nbsp;
                <select className={style.selector} name="diets" value={input.diets} onChange={changeHandler}>
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
                </select>&nbsp;
                <button className={style.botonCreateRecipe} onClick={buttonFilter}>Filter</button>&nbsp;

                <select className={style.orderselectoralf} name="orderselectoralf" onChange={alphHandler}>
                    <option name="nothing">Alph. order</option>
                    <option name="asc">Asc.</option>
                    <option name="desc">Desc.</option>
                </select>&nbsp;

                <select className={style.orderselectorscore} name="orderselectorsco" onChange={scoreHandler}>
                    <option name="nothing">Score order</option>
                    <option name="asc">Asc.</option>
                    <option name="desc">Des.</option>
                </select>&nbsp;

                <Link to='/createrecipe'>
                    <button className={style.botonCreateRecipe}>Create Recipe</button><br></br>
                </Link>


            </nav><br /><br />
            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes?.length}  // ESTE PUTO SIGNO ACA ME RESOLVIO TODO EL PROBLEMA !!!!
                paginado={paginado}
                currentPage={currentPage}
            />
            <div className={style.recipes}>
                {currentRecipes?.map(elem => {
                    return (
                        //<Link to={`/home/${elem.id}`}>
                        <Recipe
                            key={elem.id}
                            id={elem.id}
                            title={elem.title}
                            image={elem.image}
                            healthScore={elem.healthScore}
                            diets={elem.diets}
                        />
                        //</Link>
                    )
                }
                )}
            </div>

{/*             <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes?.length}
                paginado={paginado}
                currentPage={currentPage}
            />  */}
        </div>
    )
}

/* const mapsStateToProps = (state) => {
    return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchRecipes: (param) => { dispatch(searchRecipes(param)) },
        searchRecipesDiet: (diet) => { dispatch(searchRecipesDiet(diet)) }
    }
} */

//export default connect(mapsStateToProps, mapDispatchToProps)(Home);
export default Home;