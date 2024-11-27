<script lang="ts">
	import { t, locale } from 'svelte-i18n';

	function switchLocale(lang: string) {
		locale.set(lang);
	}
</script>

<h1>{$t('title')}</h1>

<button on:click={() => switchLocale('es')}> Switch to Spanish </button>
<button on:click={() => switchLocale('en')}> Switch to English </button>
