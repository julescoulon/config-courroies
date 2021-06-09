<script>
  import { fetchData, getData } from "./functions/fetchData";
  import { filterData } from "./functions/filterData";

  import Code from "./components/Code.svelte";
  import Form from "./components/Form.svelte";
  import SelectProduct from "./components/SelectProduct.svelte";

  let objectDepth = 0;

  const products = [
    { name: "Courroies", value: "courroies", depth: 3 },
    { name: "Poulies trapézoïdales", value: "poulies", depth: 4 },
    { name: "Test", value: "test", depth: 5 },
  ];
  let request = undefined;

  $: selection = Array(objectDepth);

  let displayData = undefined;
  let explications = undefined;

  function fetchProduct() {
    console.clear();
    fetchData(request);
    fetchData(`${request}_explications`);
    displayData = filterData(getData(request), selection);
    explications = getData(`${request}_explications`);
    objectDepth = products.find((element) => element.value == request).depth;
  }

  import { setContext } from "svelte";

  setContext("newSelection", { newSelection });
  setContext("fetchProduct", { fetchProduct });

  console.log(displayData);
  function newSelection() {
    displayData = filterData(getData(request), selection);
  }
</script>

<div class="container">
  <h1>Configurateur</h1>
  <SelectProduct bind:request {products} />
  <h2>{request}</h2>
  {#if request !== undefined && displayData !== undefined}
    {#await displayData then data}
      <Form {data} {selection} {objectDepth} {explications} />
      <Code {data} {objectDepth} {selection} />
    {/await}
  {/if}
</div>
