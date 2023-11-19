<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let cycleOnly = true;
	function clickCycleOnly() {
		cycleOnly = !cycleOnly;
		dispatch('click-eye', cycleOnly);
	}
	
	export let allowMapDrag = true;
	function clickAllowMapDrag() {
		allowMapDrag = !allowMapDrag;
		dispatch('click-lines', allowMapDrag);
	}
</script>

<style>
	.selected {
		/* background-opacity: 25%; */
		background-color: var(--foregroundColour);
		color: var(--backgroundColour);
	}
	
	button {
		width: 2rem;
		height: 2rem;
		border-width: 1px;
		border-style: solid;
		color: var(--foregroundColour);
		background-color: transparent;
		border-color: var(--foregroundColour);
		transition-property: background-color, background-opacity; 
		transition-duration: 250ms;
		border-radius: 0.375rem;
	}
	
	.single-click:hover {
		background-opacity: 50%;
		background-color: lightgray;
	}
</style>

<!-- Icons from heroicons.dev -->



<button type="button" on:click={clickCycleOnly} class:selected={cycleOnly} title="Show Markers">
	<!-- {#if eye}
		<p>On</p>
	{:else}
		<p>Off</p>
	{/if} -->
	<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"></path>
	</svg>

	<!-- <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="{eye ? 2 : 1}" viewBox="0 0 24 24" stroke="currentColor">
	{#if eye}
		<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
	{:else}
		<path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
	{/if}
	</svg> -->
</button>

<button type="button" on:click={clickAllowMapDrag} class:selected={allowMapDrag} title="Show Lines">
	<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
	</svg>
</button>