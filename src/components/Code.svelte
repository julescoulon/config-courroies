<script>
  export let selection, data, objectDepth;

  let code = [];
  function searchCodes(data) {
    data.forEach((element, i) => {
      let name = element.name || element;
      if (selection.includes(name)) {
        code.push(element.code || name);
        if (element.content) {
          searchCodes(element.content);
        }
      }
    });
  }
  searchCodes(data);

  import { parseCode } from "../functions/parseCode";

  let finalCode = parseCode(code, objectDepth, selection);

  import copy from "copy-to-clipboard";
  let isCopy = false;
  function copyCode() {
    copy(finalCode);
    isCopy = true;
    setTimeout(() => (isCopy = false), 5000);
  }
</script>

<section class="code">
  <div class="container">
    <div class="code-block">
      <input type="text" bind:value={finalCode} readonly />
      <button
        on:click={copyCode}
        disabled={finalCode.length == 0 ? true : false}
      >
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
    display: flex;
    border: solid 2px;
    margin: -1rem;
    padding: 1rem;
    background: white;
  }

  input,
  button {
    padding: 0.5rem;
    font-size: inherit;
    border: none;
  }

  input {
    margin-right: auto;
    border: solid 1px;
    flex-grow: 1;
  }

  button {
    margin-left: 1rem;
    border: solid 1px;
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
