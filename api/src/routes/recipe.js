const { Router } = require('express');
const axios = require('axios')
const { Op } = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet, Recipe_Diet } = require('../db'); // ACA importo donde ejecuto los models de tablas

const {
    API_Key
} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// En esta ruta si paso algo por query lo busco en la api y en la bbdd interna, sino encuentra nada arroja un error
// Si no le paso nada por query traigo 20 elementos de la api mas todos de la bbdd interna
router.get('/', async (req, res) => {
    //          recipes?title=
    try {

        const { title } = req.query;
        //  if (title) throw new Error('Debes ingresar una query valida.--> ?title=busqueda')
        if (title) {
            const queryAxios = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&query=${title}`)
            //console.log(queryAxios.data.results);
            // console.log(title + '<--');
            const queryBD = await Recipe.findAll({

                attributes: ['id', 'title', 'image', 'summary', 'healthScore'],
                // attributes: ['id', 'title', 'image', 'summary']
                include: [
                    {// aca hago la puta relacion para que me traiga automaticamente de la tabla intermedia
                        model: Diet,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    }
                ],
            });

            let propS = [];
            if (queryAxios.data.results.length > 0) {
                propS = queryAxios.data.results.map(elem => {
                    return { id: elem.id, title: elem.title, image: elem.image, summary: elem.summary, diets: elem.diets, healthScore: elem.healthScore }
                });
            }

            //filtro la busqueda de la bd interna
            const filter = queryBD.filter(elem => {
                return elem.title.toLowerCase().includes(title.toLowerCase())
            })
            //console.log(filter);
            const reFormat = filter.map(elem => {
                let objeto = {};
                objeto.id = elem.id;
                objeto.title = elem.title;
                objeto.image = elem.image;
                objeto.summary = elem.summary;
                objeto.healthScore = elem.healthScore;

                objeto.diets = elem.diets.map(e => e.name) // aca paso de [{diet: 'vegan'}, {diet:'gluten'}] -> ['vegan', 'gluten']
                return objeto;
            });

            const total = reFormat.concat(propS);

            if (total.length === 0) throw new Error('La receta buscada no existe en nuestra BBDD')
            res.status(200).json(total);


        } else {

            const queryAxios = await axios
                (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&number=100`)
            const propS = await queryAxios.data.results.map(elem => {
                return { id: elem.id, title: elem.title, image: elem.image, summary: elem.summary, diets: elem.diets, healthScore: elem.healthScore }
            });

            const queryBD = await Recipe.findAll({
                attributes: ['id', 'title', 'image', 'summary', 'healthScore'],
                include: [
                    {// aca hago la puta relacion para que me traiga automaticamente de la tabla intermedia
                        model: Diet,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    }
                ],
            });
            //console.log(queryBD);
            //esto solo para que me quede la info igual a como la envia la api
            //ACA PROBAR CON LOS tre puntos {...queryBD, diets: queryBD.diets.map(elem => elem.name)
            const reFormat = queryBD.map(elem => {
                let objeto = {};
                objeto.id = elem.id;
                objeto.title = elem.title;
                objeto.image = elem.image;
                objeto.summary = elem.summary;
                objeto.healthScore = elem.healthScore;

                objeto.diets = elem.diets.map(e => e.name) // aca paso de [{diet: 'vegan'}, {diet:'gluten'}] -> ['vegan', 'gluten']
                return objeto;
            });

            const total = reFormat.concat(propS);
            res.status(200).json(total);
        }

    } catch (error) {
        return res.status(404).send(error.message)
    }
})


// En esta ruta paso por params el id de una receta y traigo su contenido con lo que pide el PI
router.get('/:idReceta', async (req, res) => {

    try {
        const { idReceta } = req.params;
        console.log(idReceta);
        // if(!idReceta) throw new Error('No has introducido un params válido.')
        //console.log(idReceta.toString().length);
        let size = idReceta.toString().length;
        // tambien podria haber buscado letras dentro del string 
        // y si tiene quiere decir que pertenece a la bbdd interna
        if (size > 10) {

            const queryLocal = await Recipe.findOne({
                where: { id: idReceta },
                attributes: ['id', 'title', 'image', 'summary', 'healthScore', 'stepToStep'],
                include: [
                    {// aca hago la puta relacion para que me traiga automaticamente de la tabla intermedia
                        model: Diet,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    }
                ]
            });
            if (!queryLocal) throw new Error('No se encontro lo que busca en la BBDD interna.')

            const reFormat = {

                id: queryLocal.id,
                title: queryLocal.title,
                image: queryLocal.image,
                summary: queryLocal.summary,
                healthScore: queryLocal.healthScore,
                stepToStep: queryLocal.stepToStep,
                diets: queryLocal.diets?.map(e => e.name) // aca paso de [{diet: 'vegan'}, {diet:'gluten'}] -> ['vegan', 'gluten']

            };

            return res.status(200).json(reFormat);

        } else {
            const queryAxios = await axios
                (`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_Key}`)
            //console.log(queryAxios);
            if (!queryAxios) throw new Error('No se encontro lo que busca en la API')
            const {
                id,
                title,
                image,
                dishTypes,
                diets,
                summary,
                healthScore,
                analyzedInstructions } = queryAxios.data;
            // colocar condicion de que el arreglo sea mayor a cero sino el map daria error

            let stepToStep = analyzedInstructions[0]?.steps.map(elem => {
                return elem.number + ') ' + elem.step;
            });

            if (!stepToStep) stepToStep = []

            //console.log(analyzedInstructions[0]);
            return res.status(200).json({ id, title, image, dishTypes, diets, summary, healthScore, stepToStep })
        }

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

// Aca en esta ruta del tipo POST creo un registro en la bbdd interna 
router.post('/', async (req, res) => {

    try {

        const { title, summary, healthScore, stepToStep, image, diets } = req.body;

        if (!title || !summary) throw new Error('Faltan datos para crear la receta')

        const existTitle = await Recipe.findAll({ where: { title: title } })
        //console.log(existTitle + '<<<<');
        if (existTitle.length) throw new Error('Ya existe una receta con ese titulo.')

        const newRecipe = await Recipe.create({ title, summary, healthScore, stepToStep, image });

        const dietSearch = [];

        if (diets) { // ["dieta1, "dieta2", "dieta3"]
            for (let i = 0; i < diets.length; i++) {
                dietSearch.push(... await Diet.findAll({ where: { name: diets[i] } }))  // <--------
            } //  [{id:1, name:'Vegano'}, {id:7, name:'Gluten'}]
        }
        const filterDietName = dietSearch.map(elem => elem.name) // sino aplico este map tendria un arreglo de objetos
        //const dietSearch = await Diet.findAll({ where: { name: diets } }) lo dejo del yipo diets: ["Vegano", "Gluten"...]
        // console.log("--> " + dietSearch);
        await newRecipe.addDiet(dietSearch); // aca lo vinculo a la tabla intermedia para despues usarlo en la busqueda

        const aux = await Recipe.findOne({ where: { title: title } })
        //console.log(aux);
        //res.status(200).json(aux)
        const { id } = aux
        res.status(200).json({ id, title, summary, healthScore, stepToStep, image, diets: filterDietName });

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;