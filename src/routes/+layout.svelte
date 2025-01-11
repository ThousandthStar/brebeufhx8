<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte'
	let { children } = $props();
</script>


<Navbar class="absolute w-full mt-0"/>
{@render children()}
