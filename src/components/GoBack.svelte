<script lang="ts">
	import '../lib/i18n/index';
	import { locale } from 'svelte-i18n';
	let { prevUrl } = $props();
	locale.set('en');
</script>

<div class="Header">
	<h1 class="HeaderText">
		HackIT<span class="HeaderText-alt">./</span>BA<span class="HeaderText-alt">&gt</span>
	</h1>
	<div class="HeaderActions">
		<a href={prevUrl}>
			<button> Go Back</button>
		</a>
	</div>
</div>
