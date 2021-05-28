<script>
    export let data, selection, index;

    function selectData() {
        console.log(data);
        console.log(selection);
    }

    console.log(selection[index]);
</script>

<select
    bind:value={selection[index]}
    on:input={selectData}
    disabled={selection[index - 1] !== null ? false : true}
>
    <option disabled selected value={null}>-</option>
    {#each data as item}
        <option value={item.name}>{item.name}</option>
    {/each}
</select>
