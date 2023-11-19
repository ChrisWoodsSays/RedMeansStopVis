<script lang="ts">
	// @ts-nocheck
	import Intro from './Intro.svelte';
	import Visualisation from './Visualisation.svelte';
	import Map from './Map.svelte';
	import About from './About.svelte';
	import Title from './Title.svelte';
	import Credits from './Credits.svelte';
	import * as d3 from 'd3'

	import { backgroundColour, backgroundColourLighter, foregroundColour } from '../utils/colours';
	import { rmsRed, rmsAmber, rmsGreen } from '../utils/colours';
	import { getCombinedLocations, getSurveys } from "../utils/getData";
	import { onMount } from "svelte";
	import gsap from 'gsap';
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

	export let tooltipTarget;
	let width = 0;
	let height = 0;

	export let selectedLocationShortName = "All";
	export let allowMapDrag = true;

	export let surveys = [];
	export let locations = [];
    export let people = [];
    export let jumpedRedLights = 0;

	let currentStep = 0;

	let animation = [];
    let x;

	onMount(
		async () => {
            gsap.registerPlugin(ScrollTrigger);

            // animation[1] = gsap.fromTo(".step1", 
            //     {
            //         attr:{r: 0},
            //         duration: 2
            //     },
            //     {
            //         attr:{r: 80},
            //         duration: 1
            //     }
            // )

            // animation[2] = gsap.fromTo(".step2", 
            //     {
            //         attr:{r: 0},
            //         duration: 2
            //     },
            //     {
            //         attr:{r: 15},
            //         duration: 1
            //     }
            // )

            // animation[3] = gsap.fromTo(".step3",
            //     {
            //         attr:{r: 0},
            //         duration: 2
            //     },
            //     {
            //         attr:{r: 10},
            //         duration: 2
            //     }
            // )

            animation[4] = gsap.fromTo(".stepRed",
                {
                    attr:{r: 0},
                    duration: 2
                },
                {
                    attr:{r: 4},
                    duration: 2
                }
            );

            animation[5] = gsap.fromTo(".stepAmber", 
                {
                    attr:{"opacity": 1},
                    duration: 2
                },
                {
                    attr:{"opacity": 0},
                    duration: 2
                }
            );

            animation[5] = gsap.fromTo(".stepGreen", 
                {
                    attr:{"opacity": 1},
                    duration: 2
                },
                {
                    attr:{"opacity": 0},
                    duration: 2
                }
            );

            gsap.utils.toArray(".stepDiv").forEach(step => {
                const dataStep = step.getAttribute('data-step');
                ScrollTrigger.create ({
                    //trigger: ".intro", // Trigger on the last page
                    trigger: step,
                    //start: "top top",
                    start: "top centre",  // when top of trigger reaches centre of viewport
                    // end: "+=60%",
                    markers: true,    
                    // scrub: 2,
                    animation: animation[dataStep], // Use the GSAP animation defined above
                    //onEnter onLeave onEnterBack onLeaveBack
                    toggleActions: "restart none reverse reverse",
                    onEnter: (self) => {
                        currentStep = dataStep
                        console.log("onEnter", currentStep)
                    },
                    onEnterBack: (self) => {
                        currentStep = dataStep
                        console.log("onEnterBack", currentStep)
                    }
                })
            })
		}
	)

</script>

<!-- Use this because window.innerHeight respects mobile address bar, unlike clientHeight -->
<svelte:window bind:innerHeight = {height} />

<div
  class="scrollama-container"
>
	<!-- <Intro {width} {height} {tooltipTarget}></Intro> -->
	<div
		class="scrollama-graphic"
		bind:clientWidth={width}
		bind:this={tooltipTarget}
	>
		{#if surveys.length > 0 && width > 0 && height > 0}
			<div class="page">
				<div class="visualisation">
					<Title widthPercentage = {"25%"} />
					<div>
						<Visualisation {surveys} {locations} {people} {currentStep} {width} {height} {tooltipTarget} bind:selectedLocationShortName bind:allowMapDrag></Visualisation>
						<!-- <Credits {foregroundColour} /> -->
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="scrollama-steps" id="yearSection">
        <div class="stepDiv intro" class:active={currentStep == 1 } data-step=1>
            <h1>
                We gathered {people.length} volunteers
			</h1>
			<p>
                Body Text
            </p>
        </div>
        <div class="stepDiv" class:active={currentStep == 2} data-step=2>
            <h1>
                and carried out {surveys.length} surveys (2) 
			</h1>
            <p>
                Body Text
            </p>
        </div>
        <div class="stepDiv" class:active={currentStep == 3} data-step=3>
            <h1>
                Covering {locations.length} Junctions (3)
			</h1>
            <p>
                Body Text
            </p>
        </div>
        <div class="stepDiv" class:active={currentStep == 4} data-step=4>
            <h1>
                We saw {jumpedRedLights} Red Lights Jumped (4) 
			</h1>
            <p>
                Body text
            </p>
        </div>
        <div class="stepDiv" class:active={currentStep == 5} data-step=5>
            <h1>
                {surveys.filter(s => s.colourName == "Red").length} Red Category Surveys (5) 
			</h1>
            <p>
                Where lights were jumped very frequently.  In some cases, on every cycle and in all cases by the fifth cycle.
            </p>
        </div>
        <div class="stepDiv" class:active={currentStep == 6} data-step=6>
            <h1>
                {surveys.filter(s => s.colourName == "Amber").length} Amber Category Surveys (6) 
			</h1>
            <p>
                Lights jumped regularly.  Whilst less bad, in these surveys, drivers jumped between every 5th and {d3.max(surveys.filter(s => s.colourName == "Amber"), s => s.oneRedLightJumpedPerNMinutes)}st cycle.
            </p>
        </div>
        <div class="stepDiv" class:active={currentStep == 7} data-step=7>
            <h1>
                {surveys.filter(s => s.colourName == "Green").length} Green Category Surveys (7) 
			</h1>
            <p>
                In the best surveys, no drivers jumped a red light.  This is what we should expect all the time.
            </p>
        </div>
    </div>
</div>
<style>
  .visualization-wrapper {
    width: 100%;
    height: 100%;
  }

  .draw-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

	/* .container {
		display: flex;
		background-color: #202020;
		position: relative;
		width: 100%;
	} */

	.page {
		height: 100vh;
	}

	/* .map {
		width: 60%;
	} */

	/* .about {
		width: 100%;
	} */

	.visualisation {
		width: 100%;
		/* margin-left: 50%; */
	    background-color: white;
	    position:absolute;
	    top: 0;
	    bottom: 0;
	    overflow-y: none;
	}

	h1 {
		font-size: 1.5vw;
		font-weight: 400;
		/* line-height: 30%; */
	}
	
</style>
	
	