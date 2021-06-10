async function fetchData(request, file) {
  let res = await fetch(`data/${request}/${file}.json`);
  res = (await res.json()).data;
  window.localStorage.setItem(`${request}_${file}`, JSON.stringify(res));
  return res;
}

function getData(request, file) {
  let res = window.localStorage.getItem(`${request}_${file}`);
  res = JSON.parse(res);
  return res;
}

export { fetchData, getData };
