<script>
  export let data, selection, objectDepth, explications, request;
  import Help from "./Help.svelte";
  import Select from "./Select.svelte";
</script>

<form>
  {#each Array(objectDepth) as _, index}
    <section>
      {#if explications[index]}
        <h3>{explications[index].section_title}</h3>
      {/if}
      {#if index == 0 || selection[index - 1]}
        <Select bind:selection {data} {index} />
        {#if explications[index].questions}
          {#if explications[index].questions.length > 0}
            <Help {index} {explications} {request} />
          {/if}
        {/if}
      {:else}
        <p>
          Veuillez remplir la section précédente pour accéder à cette section.
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
