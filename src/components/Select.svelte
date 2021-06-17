<script>
  export let data, selection, index;

  let currentDepth = 0;
  function getInputs(data, currentDepth) {
    // console.log(currentDepth, index);
    if (currentDepth !== index) {
      // console.log(selection[index - 1]);
      data.forEach((element) => {
        if (selection[currentDepth] == element.name) {
          data = getInputs(element.content, currentDepth + 1);
        }
      });
    } else {
      // console.table(data);
    }
    return data;
  }
  // console.groupCollapsed("Section " + index);
  let array = getInputs(data, currentDepth);
  // console.groupEnd();
  // console.table(selection);

  import { getContext } from "svelte";
  const { newSelection } = getContext("newSelection");
  function setSelection() {
    if (index < selection.length - 1) {
      for (let i = index + 1; i < selection.length; i++) {
        selection[i] = null;
      }
    }
    newSelection();
    // console.log(selection);
  }
  import { getCookie } from "../functions/manageCookie";

  let preferences = getCookie("filtersPreferences");
  let isGrouped = preferences[index].groupBy;
  console.log(isGrouped);
  let hasCategory = array.every((element) => element.category);
  if (isGrouped && hasCategory && array.length > 0) {
    console.log("index", index);
    let categories = [];
    array.forEach((e) => {
      let categoryIndex = categories.findIndex((c) => e.category == c.name);
      if (categoryIndex == -1 ? true : false) {
        categories.push({ name: e.category, content: [e] });
      } else {
        categories[categoryIndex]["content"].push(e);
      }
    });
    array = categories;
  }
</script>

<!-- svelte-ignore a11y-no-onchange -->
{#if array.length > 0}
  {#if !isGrouped}
    {#if array.length > 8}
      <select bind:value={selection[index]} on:change={setSelection}>
        <option disabled selected value={null}>-</option>
        {#each array as item}
          <option value={item.name || item}>
            {item.name || item}
          </option>
        {/each}
      </select>
    {:else}
      <div class="radio-list">
        {#each array as item, i}
          <label>
            <input
              type="radio"
              bind:group={selection[index]}
              on:change={setSelection}
              value={item.name || item}
            />
            <span>{item.name || item}<span /></span></label
          >
        {/each}
      </div>
    {/if}
  {:else}
    <select bind:value={selection[index]} on:change={setSelection}>
      <option disabled selected value={null}>-</option>
      {#each array as category}
        <optgroup label={category.name}>
          {#each category.content as item}
            <option value={item.name || item}>
              {item.name || item}
            </option>
          {/each}
        </optgroup>
      {/each}
    </select>
  {/if}
{:else}
  <p style="color:crimson">
    Oups ! Aucune donnée renseignée avec cette sélection. 🤷‍♂️
  </p>
{/if}

<style>
  .radio-list {
    display: flex;
    flex-wrap: wrap;
  }

  label input[type="radio"] {
    display: none;
  }

  label input[type="radio"] + span {
    padding: 1rem;
    display: block;
    border: solid 1px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s ease-out;
  }

  label input[type="radio"] + span:hover {
    box-shadow: inset 0px 0px 0px 2px black;
  }

  label:last-child input[type="radio"] + span {
    margin-right: unset;
  }

  label input[type="radio"]:checked + span {
    color: white;
    background-color: black;
  }
</style>
