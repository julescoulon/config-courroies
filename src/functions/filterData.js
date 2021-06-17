async function filterData(data, selection, filterPreferences) {
  data = await data;

  if (selection) {
    let depth = 0;
    data = findData(data, selection, depth, filterPreferences);
  }

  return data;
}

export { filterData };

function findData(data, selection, depth, filterPreferences) {
  data.forEach((element) => {
    // console.log(element);
    [name, content] = [element.name, element.content];
    if (Array.isArray(content)) {
      if (!selection.includes(name)) {
        element.content = [];
      } else {
        depth++;
        console.log(depth);
        if (filterPreferences[depth].sortBy !== "-") {
          content = sortData(content, filterPreferences, depth);
        }
        findData(content, selection, depth, filterPreferences);
      }
    }
  });
  return data;
}

function sortData(data, filterPreferences, depth) {
  console.log(filterPreferences, depth);
  let index = data[0]["name"]
    .split(", ")
    .findIndex(
      (element) => element.split(" ")[0] == filterPreferences[depth].sortBy
    );
  if (index > -1) {
    data.sort((a, b) => {
      function findValue(i) {
        i = i["name"].split(", ")[index];
        i = i.split(" ");
        i = i[i.length - 1];
        return i;
      }
      a = findValue(a);
      b = findValue(b);
      return a - b;
    });
  }
  return data;
}
