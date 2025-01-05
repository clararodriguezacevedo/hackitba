<script>
    let spanCount = 50;

    const getRandom = () => Math.floor(Math.random() * 50) + 1;
</script>

<div class="Body-top">
    <h1 class="Body-top-text">HackIT<span class = "HeaderText-alt">./</span>BA<span class = "HeaderText-alt">&gt</span></h1>
    <h1 class="Body-top-text-small">By <span class = "Body-top-text-small-alt">Computer Society</span> ITBA</h1>
    <div class="bubbles">
        {#each Array(spanCount) as _, index}
            <span style="--i: {getRandom()}"></span>
        {/each}
    </div>
</div>
