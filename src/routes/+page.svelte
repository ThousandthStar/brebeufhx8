<script lang="ts">
	import InputForm from '$lib/components/inputForm.svelte';

	let data = $props();
</script>

<!-- title -->
<!--<div class="h-96 bg-green-500">-->
<!--	<h1 class="h1">[TITLE]</h1>-->
<!--</div>-->

<!-- actual content -->
<div class="flex flex-col space p-4">
	<!--	form -->
	<div>

	</div>
	<!--	info -->
	<div>
		<InputForm data={data.form}/>
	</div>
</div>