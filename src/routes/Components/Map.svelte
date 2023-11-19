<script lang="ts">	
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
  	import { foregroundColour, foregroundColour2, rmsAmber, rmsGreen, rmsRed } from '../utils/colours';	
	import { getCategoryFromID, getCategory } from "../utils/getData";
	import * as d3 from 'd3'
	import MapToolbar from './MapToolbar.svelte';
	import Tooltip from './Tooltip.svelte';
	import { } from '../actions/tooltipable';

	/**
   * @type {import("leaflet").Map | import("leaflet").LayerGroup<any>}
   */
	let map;
	let mapReady = false;
	export let width = 0, height = 0;
	export let allowMapDrag = false;
	export let locations = [];
	export let tooltipTarget;
	let LEAFLET;
	let markers = [];
	let toolbar;
	let toolbarComponent;
	export let selectedLocationShortName;

	onMount(async () => {
		console.log(browser)
		if(browser) {		 	
            LEAFLET = await import('leaflet');
			
			map = LEAFLET.map('map' , { scrollWheelZoom: allowMapDrag, touchZoom: allowMapDrag, dragging: allowMapDrag, minZoom: 11, maxZoom:17} ).setView({lat: 52.475, lng: -1.865}, 11);
			// Stadia.StamenTonerLite
			// LEAFLET.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png',{
  			// 	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

			// CartoDB_Positron 
			LEAFLET.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			}).addTo(map);
		
			map.attributionControl.setPosition('bottomright');

			let eye = true;
			let lines = true;
			toolbar = LEAFLET.control({ position: 'topright' });
			toolbar.onAdd = (map) => {
				let div = LEAFLET.DomUtil.create('div');
				toolbarComponent = new MapToolbar({
					target: div,
					props: {allowMapDrag},
					//bind: {cycleOnly, allowMapDrag}
				});

				toolbarComponent.$on('click-eye', ({ detail }) => eye = detail);
				toolbarComponent.$on('click-lines', ({ detail }) => lines = detail);

				return div;
			}
			//toolbar.addTo(map);

			mapReady = true;
		}

	})

	onDestroy(async () => {
        if(map) {
            map.remove();
        }
    });

	function onClick(e, data) {
		selectedLocationShortName = e.target.options.shortName; // is a string
		console.log(e)
	}
	let component
	function onMouseOver(e, data) {
		console.log("onMouseOver map", tooltipTarget)
		component = new Tooltip({
			target:tooltipTarget,
			props: {
				id: data.id,
				shortName: data.shortName, 
				surveyDate: data.surveyDate, 
				minutesSurveyed: data.minutesSurveyed, 
				noOfPhases: data.noOfPhases, 
				redLightsPerJump: data.redLightsPerJump, 
				minutesPerJump: data.minutesPerJump,
				meaning: data.meaning, 
				colourcode: data.colourCode,
				x: e.originalEvent.clientX, 
				y: e.originalEvent.clientY,
				foregroundColor: "white",//foregroundColor,
				backgroundColor: "blue",//backgroundColor,
				targetWidth: width,
				targetHeight: innerHeight
			},
			intro: true
		});
	}

	function onMouseLeave(e) {
		console.log("handleMouseleave")
		component.$destroy();
		//node.removeEventListener('mouseleave', handleMouseleave)
	}

	let locationMarkers;

	$: if(mapReady && map && locations.length > 0) {
		markers.forEach(marker => marker.remove());

		function compareNumbers(a, b) {
			return a - b;
		}

		locationMarkers = LEAFLET.featureGroup().addTo(map);
		console.log(locations)
		locations.filter(l => l.lat && l.lat != 41.191907).sort((a,b) => a.oneRedLightJumpedPerNMinutes - b.oneRedLightJumpedPerNMinutes).forEach(l => {
			// const totalMinutesPerJump = Math.round((l.noOfJumpers > 0 ? l.minutesSurveyed / l.noOfJumpers : -1)*10)/10;
			// const redLightsPerJump = Math.round((l.noOfJumpers > 0 ? l.noOfPhases / l.noOfJumpers : -1)*10)/10;

			if (l.lat && l.lon) {
				let circleMarker = LEAFLET.circleMarker([l.lat, l.lon], {
					shortName: l.shortName,
					radius : 15,
					fillColor  : getCategory(l.redLightsPerJump).colourCode,
					color  : "white",
					strokeOpacity: 1,
					//color  : colourScale(redLightsPerJump),
					//dashArray: l.redCycleSecs === 0 ? '3, 6': '',
					opacity: 1,
					fillOpacity: 1,//l.ID == selectedLocationShortName ? 0.2 : 0.2,
					weight: 2,
				})
					.on('click', onClick)
					.on('mouseover', function (e) {
						onMouseOver(e, l);
					})
					.on('mouseout', function (e) {
						onMouseLeave(e);
					})
					.addTo(map);
					markers.push(circleMarker);

				locationMarkers.addLayer(circleMarker);
			}
		});

		map.fitBounds(locationMarkers.getBounds());

		let selectedLocationRecord;
		console.log(selectedLocationShortName)
		selectedLocationRecord = locations.find(l => l.shortName == selectedLocationShortName);
		if (selectedLocationRecord) {
			map.flyTo([selectedLocationRecord.lat, selectedLocationRecord.lon]);
		}

		if(allowMapDrag) {
			map.scrollWheelZoom.enable();
			map.touchZoom.enable();
			map.dragging.enable();
		} else {
			map.scrollWheelZoom.disable();
			map.touchZoom.disable();
			map.dragging.disable();
		}
	}	

</script>


<div
    class="draw-wrapper"

>
	<div id="map" style="width:{width}px; height:{height}px;">
		<div class="leaflet-bottom leaflet-left">
			<div class="info legend leaflet-control">
				<div class = "info-heading">Red Light Cycles per Jump</div>
				<i style="background:{rmsRed};opacity:1"></i> Red: Up to 5<br>
				<i style="background:{rmsAmber};opacity:1"></i> Amber: Over 5<br>
				<i style="background:{rmsGreen};opacity:1"></i> Green: No red lights jumped<br>
			</div>
		</div>
	</div>
</div>

<style>
	.info {
		padding:6px;
		color: var(--foregroundColor);
		font-size: 2.0vh; 
		line-height: 180%;
		background-color: white;
		font-family: var(--font);

	}

	.info-heading {
		margin-bottom:3px;
		font-weight: 400;
	}

	.legend i {
		width: 2.0vh;
		height: 2.0vh;
		border-radius: 50%;
		margin-right: 4px;
		opacity: 0.7;
		display: inline-block;
		vertical-align: middle;
		/* zoom: 1; */
	}

	#map { 
		position: relative; 
		top: 0;
  		bottom: 0;
	}
</style>


