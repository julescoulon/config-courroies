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
        element.content = [];
      } else {
        findData(content, selection);
      }
    }
  });
  return data;
}