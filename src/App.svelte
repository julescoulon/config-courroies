<script>
  import { fetchData, getData } from "./functions/fetchData";
  import { filterData } from "./functions/filterData";

  import Code from "./components/Code.svelte";
  import Form from "./components/Form.svelte";

  const objectDepth = 3;
  const request = "courroies";
  $: selection = Array(objectDepth);
  fetchData("courroies");
  fetchData("courroies_explications");

  let displayData = filterData(getData(request), selection);
  let explications = getData(request + "_explications");

  import { setContext } from "svelte";
  setContext("newSelection", { newSelection });

  function newSelection() {
    displayData = filterData(getData(request), selection);
  }
</script>

<div class="container">
  <h1>Configurateur</h1>
  <h2>Courroies trapézoïdales</h2>
  {#await displayData then data}
    <Form {data} {selection} {objectDepth} {explications} {request} />
    <Code {data} {objectDepth} {selection} />
  {/await}
</div>
