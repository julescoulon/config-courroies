<script>
  import Image from "./Image.svelte";

  export let index, explications, request;
</script>

<details>
  <summary>
    <div>
      <i class="fas fa-info-circle" />
      <em>Un coup de main ?</em>
    </div>
    <i class="fas fa-chevron-square-down" />
  </summary>
  <div class="content">
    {#each explications[index].questions as question}
      <div class="question">
        <div>
          <div class="title">{question.title}</div>
          {#if question.answer}
            <div>{question.answer}</div>
          {/if}
          {#if question.html}
            <div>{@html question.html}</div>
          {/if}
        </div>
        {#if question.image_url}
          <Image {request} {question} />
        {/if}
      </div>
    {/each}
  </div>
</details>

<style>
  details {
    font-size: 80%;
    margin-bottom: 1rem;
  }
  summary {
    display: flex;
    align-items: center;
    padding: 0.5rem;

    border-bottom: solid 1px;
  }

  summary > div {
    margin-right: auto;
  }

  .question {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    gap: 1rem;
    grid-gap: 1rem;
  }

  .title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
</style>
