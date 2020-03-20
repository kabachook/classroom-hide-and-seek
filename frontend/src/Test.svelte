<script>
    import { name, address, pattern, sshKey } from './stores.js';
    import TravisBlock from './TravisBlock.svelte';
    import { fly, fade } from 'svelte/transition';

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

<div class="Box-row d-flex flex-items-center" in:fade="{{delay: 100, duration: 100}}">
    <label class="m-1">SSH key: </label>
    <input class="form-control" readonly value={$sshKey}>
    <button class="btn btn-small m-1" on:click|preventDefault={handleTestRequest} disabled={disabled}>Test</button>
</div>
    
{#if promise}
    {#await promise}
        <div class="Box-row">
            <p class="flash" in:fade="{{delay: 100, duration: 100}}">Testing connection to the repository...</p>
        </div>
    {:then result}
        <div class="Box-row">
            <p class="flash flash-success" in:fade="{{delay: 100, duration: 100}}">Repository pulled successfully</p>
        </div>
        <TravisBlock/>
    {:catch}
        <div class="Box-row">
            <p class="flash flash-error" in:fade="{{delay: 100, duration: 100}}">Failed to pull repository</p>
        </div>
    {/await}
{/if}

