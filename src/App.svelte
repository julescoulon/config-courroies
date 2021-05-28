<script context="module">
	let fetchData = async (request) => {
		let res = await fetch(`data/${request}.json`);
		res = (await res.json()).data;
		return res;
	};
</script>

<script>
	import Select from "./components/Select.svelte";

	$: selection = [];
</script>

{#await fetchData("courroies") then data}
	<form>
		<fieldset>
			<legend>Courroies trapézoïdales</legend>
			{#each Array(5) as _, index}
				<Select bind:selection {data} {index} />
			{/each}
		</fieldset>
	</form>
	<br />
	<strong>{JSON.stringify(selection)}</strong>
{/await}
{#await fetchData("courroies") then data}
	{#each data as item_1}
		<h2>{item_1.name}</h2>
		{#each item_1.content as item_2}
			<details>
				<summary><strong>{item_2.name}</strong></summary>
				<div class="content">
					<ul>
						{#each item_2.content as item_3}
							<li>{item_3}</li>
						{/each}
					</ul>
				</div>
			</details>
		{/each}
	{/each}
{/await}
