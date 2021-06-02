function codesCourroies(code, objectDepth) {
    //Exemples de code :
    //CT A133.5 / 3423 
    //CT SPA / 1120
    //(Courroies trapézoïdales + Longueur primitive CC / Section + Longueur en mm)
    let finalCode = [];
    //Vérifie que le code est complet avant d'intépreter
    if (code.length == objectDepth && !code.includes(null)) {
        let [courroieTypes, courroiesSection, courroiesLongueur] = [code[0], code[1], code[2]];
        //Nécessaire pour ancien codes Colmant Cuvelier
        if (courroiesSection == "CC") {
            courroiesSection = courroiesLongueur.split("-")[0].trim();
            courroiesLongueur = courroiesLongueur.split("-")[1].trim();

            //Convertir variable fraction courroiesSection en nombre à virgule
            let tmp = courroiesSection.split(" ");
            if (tmp.length > 1) {
                let value = ((tmp[1][0] / tmp[1][2]).toString());
                value = value.replace("0", "");
                courroiesSection = tmp[0] + value;
            }
        }



        finalCode.push(courroieTypes, courroiesSection, courroiesLongueur);

        //Ponctuations
        //A partir de quelles variable doit commencer la ponctuaction
        let index = finalCode.findIndex((element) => element == courroiesLongueur);
        //Ajoute "/" après la variable spécifié, puis ajoute "-" entre toutes les variables suivantes
        let i = index;
        while (i < finalCode.length) {
            finalCode.splice(i, 0, ((i !== index) ? "-" : "/"));
            i += 2;
        }
    }
    code = finalCode;
    return code;
}

export { codesCourroies };