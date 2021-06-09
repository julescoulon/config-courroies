<script>
  export let data, selection, index;
  // let currentDepth = 0;
  // let array = [];
  // // console.log(index, selection[index]);
  // function findData(data) {
  //   // console.log(index, currentDepth);
  //   if (index == currentDepth) {
  //     array.push(data);
  //     // console.log(index, currentDepth, data);
  //   } else {
  //     //Creuse un niveau
  //     currentDepth++;

  //     //Rappelle la fonction si possibilté de creuser
  //     data.forEach((element) => {
  //       findData(element.content);
  //     });
  //     //Réinitialise si objet de même niveau encore présent
  //     if (index == currentDepth) {
  //       currentDepth--;
  //     }
  //   }
  // }
  // findData(data);
  // array = array.flat();
  let depth = 0;
  function functionTest(data, depth) {
    if (depth < index) {
      depth = depth++;
      data = functionTest(data, depth);
      console.log(depth);
    }

    return data;
  }
  let array = functionTest(data, depth);
  // console.log(index, currentDepth, data);

  function setSelection() {
    if (index < selection.length - 1) {
      for (let i = index + 1; i < selection.length; i++) {
        selection[i] = null;
      }
    }
    newSelection();
    // console.log(selection);
  }

  import { getContext } from "svelte";
  const { newSelection } = getContext("newSelection");
</script>

<!-- svelte-ignore a11y-no-onchange -->
{#if array.length > 10}
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
    {#each array as item}
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
