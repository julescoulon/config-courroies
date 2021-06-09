<script>
  export let selection, data, objectDepth, request;
  import { parseCode } from "../functions/parseCode";

  let code = parseCode(selection, objectDepth, data, request);

  import copy from "copy-to-clipboard";
  let isCopy = false;
  function copyCode() {
    copy(code);
    isCopy = true;
    setTimeout(() => (isCopy = false), 5000);
  }
</script>

<section class="code">
  <div class="container">
    <div class="code-block">
      <input type="text" bind:value={code} readonly />
      <button on:click={copyCode} disabled={code.length == 0 ? true : false}>
        {#if !isCopy}
          <span>Copier le code</span><i class="fas fa-copy" />
        {:else}
          <span>Code copié !</span><i class="fas fa-clipboard-check" />
        {/if}
      </button>
    </div>
  </div>
</section>

<style>
  .code {
    position: static;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .code-block {
    display: grid;
    gap: 1rem;
    grid-gap: 1rem;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;

    border: solid 2px;
    margin: -1rem;
    padding: 1rem;
    background: white;
  }

  @media screen and (max-width: 640px) {
    .code-block {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  }
  input,
  button {
    padding: 0.5rem;
    font-size: inherit;
    border: none;
    border: solid 1px;
  }

  button {
    background: white;
    transition: box-shadow 0.2s ease-out;
  }

  button:not(:disabled):hover {
    box-shadow: inset 0px 0px 0px 2px;
  }

  button span {
    margin-right: 0.5rem;
  }
</style>
