<script>
  export let index, explications;
  let isBig = false;
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
          <strong>{question.title}</strong>
          {#if question.answer}
            <p>{question.answer}</p>
          {/if}
        </div>
        {#if question.image_url}
          <img
            src={question.image_url}
            class="smallImage"
            on:click={() => {
              isBig = !isBig;
            }}
          />
          {#if isBig}
            <img
              src={question.image_url}
              class="fullscreen-image"
              on:click={() => {
                isBig = !isBig;
              }}
            />
          {/if}
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

  summary div {
    margin-right: auto;
  }

  .question {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 8rem;
    align-items: center;
    gap: 1rem;
    grid-gap: 1rem;
  }

  img {
    width: 8rem;
  }

  .fullscreen-image {
    background-color: rgba(0, 0, 0, 0.75);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    padding: 1rem;
    object-fit: scale-down;
  }
</style>
