<script lang="ts">
	import GoBack from '../../components/GoBack.svelte';
</script>

<div class="w-100 bg-hackit-grey flex h-screen flex-col">
	<GoBack prevUrl="/" />
	<div class="my-12 flex h-full flex-col items-center justify-center gap-12">
		<div class="w-fit">
			<p class="text-4xl text-[white]">I am interested in participating as a</p>
		</div>
		<div class="w-fit space-x-12">
			<button>
				<a href="/login/mentors" class="hover:text-hackit-green text-3xl text-[white]"> Mentor </a>
			</button>
			<button>
				<a href="/login/sponsors" class="hover:text-hackit-green text-3xl text-[white]">
					Sponsor
				</a></button
			>
		</div>
	</div>
</div>
