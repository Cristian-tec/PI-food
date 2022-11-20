import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRecipeDetail } from '../redux/actions'
import { Link } from 'react-router-dom';
import style from '../styles/RecipeDetail.module.css'

const RecipeDetail = (props) => {

    // Todo esto para no hacer mapToProps y dispatchToProps

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id))
    }, [dispatch])


    const recipeDetail = useSelector(state => state.recipeDetail)


    return (
        <div className={style.recipeDetail}>
            <h3>Title:</h3> <h1>{recipeDetail.title}</h1>
            <img src={recipeDetail.image} alt="" />
            <h3>Diets: </h3> <p>{recipeDetail.diets?.map(elem => ' | ' + elem + ' | ')}</p>
            <h3>Summary:</h3> <p>{recipeDetail.summary?.replace(/<[^>]*>?/g, "")}</p>
            <h3>Steps:</h3>
            {recipeDetail.stepToStep?.map(elem => {
                return (
                    <p key={elem}>
                        {elem}
                    </p>
                )
            })}
            <Link to='/home'>
                <button>Back to home</button>
            </Link>

            <br /><br />
        </div>
    )
}

export default RecipeDetail;