async function filterData(data, selection) {
  data = await data;

  if (selection) {
    data = findData(data, selection);
  }
  return data;
}

export { filterData };

function findData(data, selection) {
  data.forEach((element) => {
    // console.log(element);
    [name, content] = [element.name, element.content];
    if (Array.isArray(content)) {
      if (!selection.includes(name)) {
        // console.log("oui");
        element.content = [];
      } else {
        findData(content, selection);
      }
    }
  });
  return data;
}

// function findDataa(data, selection) {
//   // if (selection) {
//   //   data.forEach((element, i) => {
//   //     if (element.name == selection) {
//   //       element.content = [];
//   //       console.log(element);
//   //     }
//   //   });
//   // }

//   console.log(selection, data);
//   // console.log(index, currentDepth);
//   if (index == currentDepth) {
//     array.push(data);
//   } else {
//     //Creuse un niveau
//     currentDepth++;
//     //Rappelle la fonction si possibilté de creuser
//     data.forEach((element, i) => {
//       findDataa(element.content, selection);
//     });
//     //Réinitialise si objet de même niveau encore présent
//     if (index == currentDepth) {
//       currentDepth--;
//     }
//   }
// }
// findDataa(data);

// // function filterData(data, selection) {
// //   console.log(index, selection[index]);
// //   array = [];
// //   findData(data, selection[index]);
// // }
