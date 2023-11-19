<script>
  import '../global.css'
//   import '../toggle-switchy.css'
//   import "@fontsource/roboto-condensed/300.css";
//   import "@fontsource/roboto-condensed/400.css";
  import "@fontsource/source-sans-3/200.css"; // Specify weight
  import "@fontsource/source-sans-3/300.css"; // Specify weight
  import "@fontsource/source-sans-3/400.css"; // Specify weight
//   import "@fontsource/open-sans/400.css"; // Specify weight
</script>

<svelte:head>
	<title>Better Streets for Birmingham | Red Means Stop</title>
	<meta name="description" content="Better Streets for Birmingham | Red Means Stop"/>
	<!-- <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap" rel="stylesheet"> -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/smooth-scrollbar/8.6.1/smooth-scrollbar.js" integrity="sha512-3Csz15JaSnj/L3/crtY2nJ0SJusskVc+wjv6qqC31RKV+JRLnV0kXZhodM+pkOKT71UZjJauQjSJuErMsrro+g==" crossorigin="anonymous"></script> -->

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
		crossorigin=""/>
  	<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
		integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
		crossorigin=""></script>

	<!-- <link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet"> -->

	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>




</svelte:head>

<slot />