<script>
  export let sortOptions, index;

  import { getCookie, setCookie } from "../functions/manageCookie";
  let preferences = getCookie("filtersPreferences");
  let sortSelection = preferences[index].sortBy;

  console.log(sortSelection);

  import { getContext } from "svelte";
  const { newSelection } = getContext("newSelection");

  function newSort() {
    preferences[index].sortBy = sortSelection;
    setCookie("filtersPreferences", preferences);
    newSelection();
  }

  let isGrouped = preferences[index].groupBy;
  function newGroup() {
    preferences[index].groupBy = isGrouped;
    setCookie("filtersPreferences", preferences);
    console.log(getCookie("filtersPreferences"));
    newSelection();
  }
</script>

<div class="filters">
  <div>
    <span class="heading">Trier par :</span>
    <label>
      <input type="radio" bind:group={sortSelection} value={"-"} />
      <span>-</span>
    </label>
    {#each sortOptions as option}
      <label>
        <input
          type="radio"
          bind:group={sortSelection}
          value={option}
          on:change={newSort}
        />
        <span>{option}</span>
      </label>
    {/each}
  </div>
  <div>
    <label class="heading">
      <input type="checkbox" bind:checked={isGrouped} on:change={newGroup} />
      <span>Grouper par catégorie</span>
    </label>
  </div>
</div>

<style>
  .filters {
    font-size: 85%;
  }
  div {
    margin-bottom: 0.5rem;
  }

  .heading {
    display: block;
    font-style: italic;
  }
</style>
