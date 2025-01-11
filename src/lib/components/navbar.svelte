<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<div class="flex justify-between items-center backdrop-blur px-5 py-5">
	<div class="flex justify-start items-center space-x-5">
		<h2 class="text-2xl font-bold text-slate-700"><b>Made with ❤️ by Andrey and Émilien</b></h2>
	</div>
	<div class="flex justify-end items-center">
		<a target="_blank" href="https://github.com/ThousandthStar/brebeufhx8">
			<Avatar.Root>
				<Avatar.Image src="/img/GitHub-Mark-ea2971cee799.png" alt="GitHub" />
				<Avatar.Fallback>GitHub</Avatar.Fallback>
			</Avatar.Root>
		</a>
	</div>
</div>
