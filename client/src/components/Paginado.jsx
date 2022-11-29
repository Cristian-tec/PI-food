import React from 'react'
import style from '../styles/Paginado.module.css'

const Paginado = ({ recipesPerPage, allRecipes, paginado, currentPage }) => {

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1);
    }
    /*  console.log(recipesPerPage + '<- recipesperpage');
        console.log(pageNumbers + ' <- pagenumbers');
        console.log(allRecipes + ' <- allrecipes');
    */
    return (
        <nav className={style.paginado}>
            <h3 onClick={() => paginado(currentPage-1)} className={style.prevNext}>Prev</h3>
            {pageNumbers?.map(number =>
                <p className={currentPage === number ? style.active : ''} onClick={() => paginado(number)} key={number}>{number}</p>
            )
            }
            <h3 onClick={() => paginado(currentPage+1)} className={style.prevNext}>Next</h3>
        </nav>
    )
}

export default Paginado;