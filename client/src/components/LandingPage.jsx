import React from 'react'
import style from '../styles/LandingPage.module.css'
import { Link } from 'react-router-dom';
import imagen from '../img/landing.png'

const LandingPage = (props) => {
    return (

        <>
            <div>
                <h1>Food recipes API</h1>
                <Link to="/home">
                    <button className={style.boton}>Ingresar al sitio</button>
                </Link>
            </div>
        </>
    )
}

export default LandingPage;