function parseCode(selection, objectDepth, data, request) {
  let currentDepth = 0;
  let code = [];
  function getCodes(data, currentDepth) {
    if (currentDepth !== objectDepth) {
      data.forEach((element) => {
        if (
          selection[currentDepth] == element.name ||
          selection[currentDepth] == element
        ) {
          code.push(element.code || element.name || element);
          data = getCodes(element.content, currentDepth + 1);
        }
      });
    }
  }

  if (!selection.includes(null)) {
    getCodes(data, currentDepth);

    switch (request) {
      case "courroies": {
        code = courroies(code);
        break;
      }
      case "bavettes": {
        code = bavettes(code);
        break;
      }
    }
    return code.join("");
  }

  return code.join(", ");
}

export { parseCode };

function courroies(code) {
  let res = [];
  //Exemples de code :
  //CT A133.5 / 3423
  //CT SPA / 1120
  //(Courroies trapézoïdales + Longueur primitive CC / Section + Longueur en mm)
  let [courroieTypes, courroiesSection, courroiesLongueur] = [
    code[0],
    code[1],
    code[2],
  ];
  //Nécessaire pour ancien codes Colmant Cuvelier
  if (courroiesSection == "CC") {
    courroiesSection = courroiesLongueur.split("-")[0].trim();
    courroiesLongueur = courroiesLongueur.split("-")[1].trim();

    //Convertir variable fraction courroiesSection en nombre à virgule
    let tmp = courroiesSection.split(" ");
    if (tmp.length > 1) {
      let value = (tmp[1][0] / tmp[1][2]).toString();
      value = value.replace("0", "");
      courroiesSection = tmp[0] + value;
    }
  }

  res.push(courroieTypes, courroiesSection, courroiesLongueur);

  //Ponctuations
  //A partir de quelles variable doit commencer la ponctuaction
  let index = res.findIndex((element) => element == courroiesLongueur);
  //Ajoute "/" après la variable spécifié, puis ajoute "-" entre toutes les variables suivantes
  let i = index;
  while (i < res.length) {
    res.splice(i, 0, i !== index ? "-" : "/");
    i += 2;
  }

  return res;
}

function bavettes(code) {
  let res = [];
  let [type, duretee, epaisseur, largeur] = [
    getValue(`${code[0]}`),
    getValue(`${code[1]}`),
    tofixedUnits(getValue(`${code[2]}`), 2),
    getValue(`${code[3]}`),
  ];

  function getValue(value) {
    let number = value.split(" ")[0];
    return number;
  }

  function tofixedUnits(value, units) {
    let length = value.length;
    for (let i = 0; i < units - length; i++) {
      value = "0" + value;
    }
    console.log(value);
    return value;
  }

  res.push("BA", type, duretee, "-", epaisseur, "X", largeur);

  return res;
}
