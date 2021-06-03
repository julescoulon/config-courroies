<script>
    export let request, question;
    let isFullscreen = false;
    console.log(question);
</script>

<img
    src={`images/${request}/${question.image_url}`}
    class={isFullscreen ? "fullscreen-image" : ""}
    on:click={() => (isFullscreen = !isFullscreen)}
    alt=""
/>

<style>
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
