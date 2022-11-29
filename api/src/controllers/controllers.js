const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_Key } = process.env;

const getRecipeTitle = async (title) => {

    const queryAxios = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&query=${title}`)
    //console.log(queryAxios.data.results);
    // console.log(title + '<--');
    const queryBD = await Recipe.findAll({

        attributes: ['id', 'title', 'image', 'summary', 'healthScore'],
        // attributes: ['id', 'title', 'image', 'summary']
        include: [
            {// aca hago la relacion para que me traiga automaticamente de la tabla intermedia
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

    //   ** if (total.length === 0)  alert('No se encontro lo que busca...');/* throw new Error('La receta buscada no existe en nuestra BBDD') */
    //res.status(200).json(total);

    return total;
}


const getRecipeAll = async () => {

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
            return total;
}
module.exports = { getRecipeTitle, getRecipeAll}