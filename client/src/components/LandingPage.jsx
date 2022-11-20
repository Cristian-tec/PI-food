import React from 'react'
import style from '../styles/Ingreso.module.css'
import { Link } from 'react-router-dom';

const Ingreso = (props) => {
    return (

        <>
            <div>
                <Link to="/home">
                    <button className={style.boton}>Ingresar al sitio</button>
                </Link>
            </div>
        </>
    )
}

export default Ingreso;