<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { rulesList} from './stores.js';

    let dispatch = createEventDispatcher();

    let testList = fetch('api/tests')
        .then(
            async result => await result.json()
        )
        .then(
            result => $rulesList = result
        );
    

    function addNewTest(event) {
        dispatch('addNewTest', event.detail);
    }

    function showRule(ruleName) {
        dispatch('showRule', {name: ruleName});
    }

    let initialDelay = 0;
    let flyDelay = () => {
        initialDelay += 50;
        return initialDelay;
    };

</script>

<div class="col-lg-3 col-md-4 col-sm-5 border-right p-3 d-flex flex-column">
    <p class="h2 text-gray-dark"> Your rules</p>
    {#await testList then testList}
        {#each testList as test}
            <div class="test-item p-1 css-truncate css-truncate-overflow" transition:fly="{{y:10, duration: 300, delay: flyDelay()}}">
                <a href="/rule/{test.name}" on:click|preventDefault="{() => showRule(test.name)}">
                    {test.name}
                </a>
            </div>
        {/each}
    {/await}
    <br/>

    <button class="btn btn-primary btn-block" on:click={addNewTest}>Add</button>
</div>