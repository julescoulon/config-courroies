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

  import { codesCourroies } from "../functions/codes/courroies";

  let finalCode = codesCourroies(code, objectDepth);
  finalCode = finalCode.join("");
  import copy from "copy-to-clipboard";
  function copyCode() {
    copy(finalCode);
    alert(`Le code ${finalCode} est copié.`);
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
        Copier le code
        <i class="fas fa-copy" />
      </button>
    </div>
  </div>
</section>

<style>
  .code {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: black;
    color: white;
  }

  input,
  button {
    padding: 0.5rem;
    font-size: inherit;
    border: none;
  }

  input {
    margin-right: auto;
  }

  button {
    background: white;
    border: solid 2px;
    color: red;

    transition: 0.2s ease-out;
  }

  button:hover {
    border: solid 2px;
    background: black;
  }

  button:disabled {
    color: grey;
  }

  .code-block {
    display: flex;
  }
</style>
