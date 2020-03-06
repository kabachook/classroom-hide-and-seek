<script>
    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    let testList = [
        {name:'test1'},
        {name:'test2'},
        {name:'test2-very-long-additionalpart11111111'},
        {name:'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'},
        {name:'test-grob'},
        {name:'wow'}
    ];

    function addNewTest(event) {
        dispatch('addNewTest', event.detail);
    }

</script>

<style>
    .test-box {
        /* border-right: 1px solid rgb(201, 201, 201); */
        padding: 5px;
        min-height: 300px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-content: center;
        min-width: 200px;
    }

    .test-item {
        padding: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    button {
        display: block;
        width: 90%;
    }

</style>

<div class="test-box border-right">
    <p style="font-size: 1.5rem"> Your tests</p>
    {#each testList as test}
        <div class="test-item">
            <a href="{test.name}" on:click|preventDefault>
                {test.name}
            </a>
        </div>
            
    {/each}

    <br/>

    <button>Add</button>
</div>