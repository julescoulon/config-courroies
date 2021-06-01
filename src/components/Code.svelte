<script>
  export let selection;
</script>

<h2>Code</h2>

<strong>
  {JSON.stringify(selection)}
  {#if selection.includes(null)}
    ❌
  {:else}
    ✔️
  {/if}
</strong>

<div class="box-code">
  {JSON.stringify(selection)}
</div>

<style>
  .box-code {
    padding: 1rem;
    border: solid 2px;
  }
</style>
