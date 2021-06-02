<script>
  export let data, selection, objectDepth, explications, request;
  import Help from "./Help.svelte";
  import Select from "./Select.svelte";
</script>

<form>
  {#each Array(objectDepth) as _, index}
    <section>
      <h3>{explications[index].section_title}</h3>
      {#if index == 0 || selection[index - 1]}
        <Select bind:selection {data} {index} />
        {#if explications[index].questions}
          <Help {index} {explications} {request} />
        {/if}
      {:else}
        <p>
          Veuillez remplir la section précendente pour remplir cette section.
        </p>
      {/if}
    </section>
  {/each}
</form>

<style>
  section {
    padding: 1rem;
    padding-bottom: 0;
    border: solid 1px;
    margin-bottom: 1rem;
  }
</style>
