<script lang="ts">
	// @ts-nocheck
	import Intro from './Components/Intro.svelte';
	import VisualisationScroller from "./Components/VisualisationScroller.svelte";
	import Map from './Components/Map.svelte';
	import Credits from './Components/Credits.svelte';
	import { backgroundColour, backgroundColourLighter, foregroundColour } from './utils/colours';

	import { getCombinedLocations, getPeople, getSurveys } from "./utils/getData";
	import { onMount } from "svelte";

	let selectedLocationShortName = "All";
	let allowMapDrag = false;
	let surveys, locations, people = [];
	let height, width = 0;
	const jumpedRedLights = 548;
	let tooltipTarget;

	onMount(
		async () => {
			// Get data
			surveys = await getSurveys();
			locations = getCombinedLocations(surveys);
			people = getPeople(surveys);
		}
	)
</script>

<svelte:window bind:innerHeight = {height} />

<div
    class="app-wrapper"
	bind:this={tooltipTarget}
	bind:clientWidth={width}

>
	<Intro/>
	<VisualisationScroller bind:selectedLocationShortName {surveys} {locations} {people} {jumpedRedLights} {allowMapDrag} {tooltipTarget}/>
	<Credits {foregroundColour} />
	<Map bind:selectedLocationShortName {locations} {allowMapDrag} {tooltipTarget} {width} {height}/>

</div>

<style>
	.app-wrapper {
		width: 100%;
		height: 100%;
	}
</style>
	
	