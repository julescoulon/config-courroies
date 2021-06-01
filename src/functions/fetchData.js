async function fetchData(request) {
  let res = await fetch(`data/${request}.json`);
  res = (await res.json()).data;
  window.localStorage.setItem(request, JSON.stringify(res));
  return res;
}

function getData(request) {
  let res = window.localStorage.getItem(request);
  res = JSON.parse(res);
  return res;
}

export { fetchData, getData };
