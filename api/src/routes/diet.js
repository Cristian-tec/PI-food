const { Router } = require('express');
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Diet } = require('../db'); // ACA importo donde ejecuto los models de tablas
const {
    API_Key
} = process.env;

const router = Router();

router.get('/', async (req, res) => {

    try {
        //const dietsSearch = await Diet.findAll();
        if (true) {
            let diet = [
                'gluten free',
                'ketogenic',
                'vegetarian',
                'lacto ovo vegetarian',
                'ovo vegetarian',
                'vegan',
                'pescetarian',
                'paleo',
                'primal',
                'low FODMAP',
                'whole 30',
                'dairy free',
                'paleolithic'
            ];

           diet.forEach(elem => {
                Diet.findOrCreate({ where: { name: elem } });
            })
            //const xx = PromiseAll(dietCreated);
            /*    let dietCreated = [];
               for (let i = 0; i < diet.length; i++) {
                   dietCreated.push(... await Diet.findOrCreate({ where: { name: diet[i] } }));
            } */
            
            let dietCreated = await Diet.findAll();
            
            //res.status(200).send('OK') //no alcanzo a ver nada por lo general
             res.status(200).json(dietCreated)
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

/* router.post('/', async (req, res) => {

}) */

module.exports = router;