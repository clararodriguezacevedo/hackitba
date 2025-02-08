<script lang="ts">
	import SectionWrapper from './SectionWrapper.svelte';
	import '../css/basic-styles.css';
	import '../app.css';
</script>

<div class="Header">
	<h1 class="HeaderText">
		HackIT<span class="HeaderText-alt">./</span>BA<span class="HeaderText-alt">&gt</span>
	</h1>
	<div class="HeaderActions">
		<a href="/FAQs" class="HeaderText-small"> FAQs </a>
		<a href="https://www.hackitba.com.ar/" target="_blank" class="HeaderText-small">
			Past Editions
		</a>
		<a href="/collaborate" class="flex">
			<button class="SignUpButton m-0"> Collaborate </button>
		</a>
	</div>
</div>
