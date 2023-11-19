<script>
	import { onMount, onDestroy } from 'svelte';
    let style=`height:100vh;`

</script>
<div class="intro" {style}>
    <h1>About the Cyclotron</h1>
    <p><img src = 'images/LC A38 Sign Cropped Shallow2.jpg' alt='A38 Cycle Counter' class = "photo">The <span class = "highlight">West Midlands Cyclotron</span> was inspired people's photographs of the cycle counters on the Bristol Road and my desire to promote cycling as a form of active travel.</p>
    <br>
    <p>It provides <span class = "highlight">real time insight</span> into the numbers of cyclists using a sample of monitored cycling routes and overall totals of all West Midlands monitored cycle routes.</p>

    <br>
    <p>My thanks to West Midlands Walking and Cycling Commissioner, Adam Tranter, Birmingham City Council and Adaptor Logic for providing access to the data.</p>
    <!-- <p>With support from the West Midlands Walking and Cycling Commissioner, Adam Tranter and active help from Birmingham City Council and Adaptor Logic who provide the </p> -->
    <!-- <img src = 'images/LC A38 Sign Cropped.jpg' alt='A38 Cycle Counter'> -->
    <br>
    <p>Chris.</p>

    <p>
        &copy; 2023, Chris Woods <a href="https://drawingwithdata.com" target="_blank">(Drawing with Data)</a>
    </p>
    <p>Data provided by Birmingham City Council &</p>
    <p>powered by <a href="http://www.adaptorlogic.com/" target="_blank">Adaptor Logic</a></p>

	<div id="map"></div>
</div>

<style>
    .intro {
        background-color: var(--backgroundColourLighter);
        color: var(--foregroundColour2);
        height: 100%;
        /* padding-top: 10px; */
        padding-left: 15px;
        padding-right: 10px;
        padding-bottom: 10px;
        font-family: var(--font);
        /* font-size: 16px; */
        /* font-size: 100%; */
        font-size: 1.0vw;
        overflow:auto;
    }

    h1 {
        color: var(--foregroundColour);
        /* font-size: 32px; */
        /* font-size: 200%; */
        font-size: 3vw;
        line-height: 200%;
        font-weight: 700;
    }

    p {
        /* font-size: 16px; */
        /* line-height: 150%; */
        line-height: 1.5;
        font-weight: 100;
    }

    .highlight {
        color: var(--foregroundColour);
    }

    .photo {
        float:right;
        width:50%;
        /* height:100%; */
        object-fit: cover;
        padding-left: 50px;
        padding-right: 50px;
        /* 
        max-height: 50%;
        background-size: cover; */
    }

</style>


