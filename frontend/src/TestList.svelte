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

<style>
    /* .test-box {
        padding: 5px;
        min-height: 300px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-content: center;
        min-width: 200px;
    }*/

    .test-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
/*
    button {
        display: block;
        width: 90%;
    } */

</style>

<div class="col-lg-2 col-md-3 col-sm-4 border-right p-3 d-flex flex-column">
    <p class="h2 text-gray-dark"> Your tests</p>
    {#await testList then testList}
        {#each testList as test}
            <div class="test-item p-1" transition:fly="{{y:10, duration: 300, delay: flyDelay()}}">
                <a href="{test.name}" on:click|preventDefault>
                    {test.name}
                </a>
            </div>
        {/each}
    {/await}
    <br/>

    <button class="btn btn-primary btn-block" on:click={addNewTest}>Add</button>
</div>