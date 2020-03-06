<script>
    import { name, address, pattern, sshKey } from './stores.js';
    import TravisBlock from './TravisBlock.svelte';

    let disabled = false;
    let promise;
    
    function handleTestRequest() {
		promise = fetch('/api/test', {
            method: 'POST',
            body: JSON.stringify(
                {
                    name:$name,
                    address:$address,
                    pattern:$pattern
                }
            )
        }).then(
            async result => {
                if ((await result.json()).result !== true) {
                    return Promise.reject();
                }
                disabled = true;
            }
        )
    }
    
</script>

<style>
    #ssh-box {
        display: inline-block;
        width: fit-content;
    }
    div {
        padding: 1rem;
    }
</style>

<div>
    <span>SSH key: </span>
    <input id="ssh-box" readonly value={$sshKey}>
    <button on:click|preventDefault={handleTestRequest} disabled={disabled}>Test</button>
</div>
    
{#if promise}
    {#await promise}
        <p>Testing connection to the repository...</p>
    {:then result}
        <p style="color: green">Repository pulled successfully</p>
        <TravisBlock/>
    {:catch}
        <p style="color: red">Failed to pull repository</p>
    {/await}
{/if}

