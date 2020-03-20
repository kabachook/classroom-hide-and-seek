<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { remoteServerUrl } from './stores.js';

    let dispatch = createEventDispatcher();

    let testList;
    let promise = fetch(`${$remoteServerUrl}/rules`)
        .then(
            result => result.json()
        )
        .then(
            result => {
                if (!result.ok) {
                    return Promise.reject();
                }
                testList = result.data
            }
        );

    function addNewTest(event) {
        dispatch('addNewTest', event.detail);
    }

    function showRule(ruleId) {
        dispatch('showRule', {id: ruleId});
    }

    let initialDelay = 0;
    let flyDelay = () => {
        initialDelay += 50;
        return initialDelay;
    };

</script>

<div class="col-lg-3 col-md-4 col-sm-5 border-right p-3 d-flex flex-column">
    <p class="h2 text-gray-dark"> Your rules</p>
    {#await promise then result}
        {#each testList as test}
            <div class="test-item p-1 css-truncate css-truncate-overflow" transition:fly="{{y:10, duration: 300, delay: flyDelay()}}">
                <a href="{$remoteServerUrl}/{test.id}" on:click|preventDefault="{() => showRule(test.id)}">
                    {test.name}
                </a>
            </div>
        {/each}
    {/await}
    <br/>

    <button class="btn btn-primary btn-block" on:click={addNewTest}>Add</button>
</div>