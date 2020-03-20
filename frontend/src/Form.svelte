<script>
    import { createEventDispatcher } from 'svelte';
    import { name, address, pattern, sshKey } from './stores.js';
    import Test from './Test.svelte';
    import { fly, fade } from 'svelte/transition';

    let disabled = false;

    $: inputError = !($name && $address && $pattern);
    
    let promise;

    function handleFormSubmit() {
        if (inputError) {
            return;
        }

        promise = fetch('/api/rule', {
            method: 'POST',
            body: JSON.stringify(
                {
                    name:$name,
                    address:$address,
                    pattern:$pattern
                }
            )
        }).then(
            async result => await result.json()
        ).then(
            result => {
                if (!result.sshKey) {
                    return Promise.reject();
                }
                $sshKey = result.sshKey;
                disabled = true;
            }
        );
    }
</script>

<div class="Box-body">
    <form class="container d-flex flex-column flex-items-center" in:fade="{{delay: 100, duration: 100}}">

        <dl class="form-group width-full">
            <dt><label for="name">Enter rule name</label></dt>
            <dd><input class="form-control width-full" type="text" bind:value={$name} required {disabled}></dd>
        </dl>

        <dl class="form-group width-full">
            <dt><label for="address">Enter repository address</label></dt>
            <dd><input class="form-control width-full" type="text" bind:value={$address} required {disabled}></dd>
        </dl>

        <dl class="form-group width-full">
            <dd><label for="pattern">Enter name pattern</label></dd>
            <dt><input class="form-control width-full" type="text" bind:value={$pattern} required {disabled}></dt>
        </dl>
    </form>
    {#if inputError}
        <div class="Box-row">
            <div class="flash flash-error p-1" transition:fade|local="{{delay: 100, duration: 100}}">Empty fields aren't allowed</div>
        </div>
    {/if}
</div>
<div class="Box-footer">
        <button class="btn" disabled={disabled || inputError} on:click|preventDefault={handleFormSubmit}>Generate key</button>
</div>


{#if promise}
    {#await promise}
        <div class="Box-row">
            <p class="flash" in:fade="{{delay: 100, duration: 100}}">Generating SSH key...</p>
        </div>
    {:then result}
            <Test {$sshKey}/>
    {:catch}
        <div class="Box-row">
            <p class="flash flash-error" in:fade="{{delay: 100, duration: 100}}">Failed to generate SSH key</p>
        </div>
    {/await}
{/if}


