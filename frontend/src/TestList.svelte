<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';

    let dispatch = createEventDispatcher();

    let testList = fetch('api/tests')
        .then(
            async result => await result.json()
        );

    function addNewTest(event) {
        dispatch('addNewTest', event.detail);
    }

    let initialDelay = 0;
    let flyDelay = () => {
        initialDelay += 50;
        return initialDelay;
    };

</script>

<div class="col-lg-3 col-md-4 col-sm-5 border-right p-3 d-flex flex-column">
    <p class="h2 text-gray-dark"> Your tests</p>
    {#await testList then testList}
        {#each testList as test}
            <div class="test-item p-1 css-truncate css-truncate-overflow" transition:fly="{{y:10, duration: 300, delay: flyDelay()}}">
                <a href="/api/{test.name}" on:click|preventDefault>
                    {test.name}
                </a>
            </div>
        {/each}
    {/await}
    <br/>

    <button class="btn btn-primary btn-block" on:click={addNewTest}>Add</button>
</div>