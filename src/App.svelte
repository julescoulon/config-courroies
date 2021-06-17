<script>
  import { fetchData, getData } from "./functions/fetchData";
  import { filterData } from "./functions/filterData";
  import {
    setCookie,
    getCookie,
    wipeAllCookies,
  } from "./functions/manageCookie";

  import Code from "./components/Code.svelte";
  import Form from "./components/Form.svelte";
  import SelectProduct from "./components/SelectProduct.svelte";

  let objectDepth = 0;

  const products = [
    { name: "Courroies", value: "courroies", depth: 3 },
    { name: "Poulies trapézoïdales", value: "poulies", depth: 4 },
    { name: "Bavettes caoutchouc", value: "bavettes", depth: 4 },
    { name: "Moyeux amovibles", value: "moyeux", depth: 3 },
    { name: "Godets d'élévateurs", value: "godets", depth: 3 },

    // { name: "Test", value: "test", depth: 5 },
  ];

  let request = undefined;

  $: selection = Array(objectDepth).fill(null);

  let displayData = undefined;
  let explications = undefined;

  function initialfetchAll() {
    wipeAllCookies();
    products.forEach((element) => {
      fetchData(element.value, "index");
      fetchData(element.value, "explications");
    });
  }
  initialfetchAll();

  function fetchProduct() {
    console.clear();
    selection = selection.fill(null);
    displayData = filterData(getData(request, "index"), selection);
    explications = getData(request, "explications");
    objectDepth = products.find((element) => element.value == request).depth;
    setCookie(
      "filtersPreferences",
      `[${Array(objectDepth).fill(
        JSON.stringify({ sortBy: "-", groupBy: false })
      )}]`
    );

    console.log(getCookie("filtersPreferences"));
  }

  import { setContext } from "svelte";

  setContext("newSelection", { newSelection });
  setContext("fetchProduct", { fetchProduct });

  function newSelection() {
    let filtersPreferences = getCookie("filtersPreferences");
    displayData = filterData(
      getData(request, "index"),
      selection,
      filtersPreferences
    );
  }
</script>

<div class="container">
  <span>ABM TECNA</span>
  <h1>Configurateur</h1>
  <SelectProduct bind:request {products} />
  {#if request !== undefined && displayData !== undefined}
    {#await displayData then data}
      <Form {data} {selection} {objectDepth} {explications} {request} />
      <Code {data} {objectDepth} {selection} {request} />
    {/await}
  {/if}
</div>
