<script lang="ts">
	import '../app.css'
	import '../css/basic-styles.css';
	import { t, locale } from 'svelte-i18n';

	function switchLocale(lang: string) {
		locale.set(lang);
	}
	
	import Header from '../components/Header.svelte';
	import BodyTop from '../components/BodyTop.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="Container">
	<Header />
	<BodyTop />
	<Footer />
</div>