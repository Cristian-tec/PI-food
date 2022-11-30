import React from 'react'
import style from '../styles/LandingPage.module.css'
import { Link } from 'react-router-dom';
import foto from '../img/landing2.png'

const LandingPage = (props) => {
    return (

        <>
            <div className={style.container}>
                {/* <h1>Food recipes API</h1> */}
                <div className={style.img_container}>
                    <img src={foto} alt="imagen" />
                </div>
                <Link to="/home">
                    <button className={style.boton}>Ingresar al sitio</button>
                </Link>
            </div>
        </>
    )
}

export default LandingPage;