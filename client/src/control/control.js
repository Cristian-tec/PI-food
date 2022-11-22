

const checkErrors = (input) => {

    if (input.healthScore < 0 || input.healthScore > 100) {
        return alert('El valor del healtScore debe estar entre 0-100')
    }

    if (input.title) {
        let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
        let res = patt.test(input.title);
        if(!res) alert('No se permiten caracteres especiales.')
    }

   /*  if (input.summary) {
        let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
        let res = patt.test(input.summary);
        if(!res) alert('No se permiten caracteres especiales.')
    } */
}

export default checkErrors;