<script>
  export let foregroundColour = '#FFFFFF';

</script>

<div
  class="credits"

>
  <p>
    &copy; 2023, <a href="https://betterstreetsforbirmingham.org/" target="_blank">Better Streets for Birmingham</a> and Chris Woods <a href="https://drawingwithdata.com" target="_blank">(Drawing with Data)</a>
  </p>

</div>

<style>
  .credits {
    position: absolute;
    z-index: 70;
    bottom: 0;
    right: 0;
    /* width: 14%; */
    padding-right: 10px;
    padding-bottom: 15px;
    font-family: var(--font);
    font-size: 1.0vw;
    color: var(foregroundColour);
  }

  p {
    text-align: right;
    line-height: 1.5;
    opacity: 0.8;
  }

  a {
    color: inherit;
  }
</style>
