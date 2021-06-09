<script>
  export let request, products;

  import { getContext } from "svelte";
  const { fetchProduct } = getContext("fetchProduct");

  function setProduct() {
    fetchProduct();
  }
</script>

<h2>Sélection du produit</h2>
<!-- svelte-ignore a11y-no-onchange -->
<select bind:value={request} on:change={setProduct}>
  {#if request == undefined}
    <option value={undefined} selected disabled>-</option>
  {/if}
  {#each products as product}
    <option value={product.value}>{product.name}</option>
  {/each}
</select>
