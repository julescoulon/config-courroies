<script>
  import { fetchData, getData } from "./functions/fetchData";
  import { filterData } from "./functions/filterData";

  import Code from "./components/Code.svelte";
  import Form from "./components/Form.svelte";

  const objectDepth = 3;

  $: selection = Array(objectDepth);
  fetchData("courroies");
  fetchData("courroies_explications");

  let displayData = filterData(getData("courroies"), selection);
  let explications = getData("courroies_explications");

  import { setContext } from "svelte";
  setContext("newSelection", { newSelection });

  function newSelection() {
    displayData = filterData(getData("courroies"), selection);
  }
</script>

<div class="container">
  <h1>Configurateur</h1>
  <h2>Courroies trapézoïdales</h2>
  {#await displayData then data}
    <Form {data} {selection} {objectDepth} {explications} />
    <Code {selection} />
  {/await}
</div>
