<script>
  import { fade } from "svelte/transition";
  import { css } from "../actions/css";

  export let id;
  export let shortName = "";
  export let surveyDate = "";
  export let minutesSurveyed = 0;
  export let noOfPhases = 0;
  export let redLightsPerJump = 0;
  export let minutesPerJump = 0;
  export let meaning = 0;
  export let colourcode = 0;

  export let x = 0;
  export let y = 0;
  export let foregroundColor = "#FFFFFF";
  export let backgroundColor = "#000000";
  export let targetWidth = 0;
  export let targetHeight = 0;

  let width = 0;
  let height = 0;

  let tooltipWidth = 0;
  let tooltipHeight = 0;

  const margin = { // Of chart
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  };

  const xNudge = 0;
  const yNudge = 20;

  // If the x position + the tooltip width exceeds the chart width, offset backward to prevent overflow
  $: leftPos =
    `${x + tooltipWidth + xNudge > targetWidth ? x - tooltipWidth - xNudge : x >= tooltipWidth / 2 ? x + xNudge : tooltipWidth / 2}px`;

  $: topPos = `${
    y + tooltipHeight > targetHeight - margin.bottom*0 ? y - tooltipHeight - 25 : y + yNudge
  }px`;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

</script>

<div
  class="ms-tooltip"
  bind:clientWidth={tooltipWidth}
  bind:clientHeight={tooltipHeight}
  use:css={{ leftPos, topPos, foregroundColor, backgroundColor }}
  in:fade={{ duration:  500 }}
>
  <div
    class="ms-tooltip-content"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <h1>
      {shortName}
    </h1>

    <p><strong>One driver jumped for every {redLightsPerJump} red lights</strong> or every {minutesPerJump} minutes</p>
    <br/>
    <table class="tip-table">
      <tbody>
        <tr>
          <td class="rowLabel">Survey Date</td>
          <td class="rowValue">{surveyDate}</td>
        </tr>
        <tr>
          <td class="rowLabel">No of Minutes Surveyed</td>
          <td class="rowValue">{minutesSurveyed.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="rowLabel">No of Red Light Phases</td>
          <td class="rowValue">{noOfPhases.toLocaleString()}</td>
        </tr>   
      </tbody>
    </table>
  </div>
</div>

<style>



  .ms-tooltip {
    position: absolute;
    z-index: 1800;
    left: var(--leftPos);
    top: var(--topPos);
    font-family: var(--font);
    padding-bottom: 5px;
  }

  /* Note that ms prefix is required to avoid conflict between Matthias' and Bootstrap tooltips */
  .ms-tooltip-content {
    position: relative;
    left: -50%;
    max-width: 300px;
    padding: 0.5vw;
    color: var(--foregroundColour);
    background-color: var(--backgroundColour);
    font-size: 1.0em;
    /* font-size: 1.2vw; */
    opacity: 0.95;
    font-family: var(--font);
    /* border: 0.0rem solid var(--foregroundColor); */
    border-radius: 0.5rem;
    /* box-shadow: 0 0 2px var(--foregroundColor), 0 0 4px var(--foregroundColor); */
  }

  @media (min-width: 1260px) {
    .ms-tooltip-content {
      max-width: 300px;
    }
  }

  h1 {
    color: red!important;
    text-align: center;
    font-size: 1.1vw;
    color: var(--foregroundColour);
    font-weight: 400;
    /* line-height: 100%; */
  }

  p {
    text-align: center;
    /* font-size: 0.8vw; */
    color: var(--foregroundColour);
    /* font-weight: 200; */
  }

  .tip-table {
    color: var(--foregroundColour);
    /* font-size: 0.9vw; */
    /* text-align: center; */
    /* margin-left: auto;
    margin-right: auto; */
  }

  .rowLabel {
    /* font-weight: 200; */
    padding-right: 20px;
  }
  .rowValue {
    text-align: right;
    /* font-weight: 200; */
  }

</style>
