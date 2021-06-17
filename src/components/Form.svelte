<script>
  export let data, selection, objectDepth, explications, request;
  import Filter from "./Filter.svelte";
  import Help from "./Help.svelte";
  import Select from "./Select.svelte";
</script>

<form>
  {#each Array(objectDepth) as _, index}
    <section>
      {#if explications[index]}
        <h3>{explications[index].sectionTitle}</h3>
      {/if}

      {#if index == 0 || selection[index - 1]}
        {#if explications[index].sortOptions}
          <Filter
            sortOptions={explications[index].sortOptions}
            sortDefaultOption={explications[index].sortDefaultOption}
            {index}
          />
        {/if}
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
