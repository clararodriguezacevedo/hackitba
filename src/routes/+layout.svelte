<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import '../lib/i18n/index';
	import { locale } from 'svelte-i18n';
	locale.set('en');
</script>

{@render children()}