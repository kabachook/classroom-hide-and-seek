<script>
    import { createEventDispatcher } from 'svelte';
    import { name, address, pattern, sshKey } from './stores.js';
    import Test from './Test.svelte';
    import { fly, fade } from 'svelte/transition';

    let disabled = false;

    $: inputError = !($name && $address && $pattern);
    
    let promise;

    async function handleFormSubmit() {
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
            async result => result.json()
        ).then(
            result => {
                $sshKey = result.sshKey;
                disabled = true;
            }
        );
		
    }

</script>

<style>
    /* .generation-form {
        width: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
    }

    #form-error-box {
        display: block;
        color: #ce5e53;
    }

    button {
        display: block;
    } */
</style>

<div class="Box-body">
    <form id="generation-form" in:fade>

    <dl class="form-group">
        <dt><label for="name">Enter rule name</label></dt>
        <dd><input class="form-control" type="text" bind:value={$name} required {disabled}></dd>
    </dl>

    <dl class="form-group">
        <dt><label for="address">Enter repository address</label></dt>
        <dd><input class="form-control mb-3" type="text" bind:value={$address} {disabled}></dd>
    </dl>

    <dl class="form-group">
        <label for="pattern">Enter name pattern</label>
        <input class="form-control mb-3" type="text" bind:value={$pattern} {disabled}>
    </dl>    

    {#if inputError}
        <div class="Box-row flash-error" transition:fade="{{delay: 100, duration: 100}}">Empty fields aren't allowed</div>
    {/if}

    <button class="btn" disabled={disabled || inputError} on:click|preventDefault={handleFormSubmit}>Generate key</button>
</form>
</div>


{#if promise}
    {#await promise}
        <p>Generating SSH key...</p>
    {:then result}
        <Test {$sshKey}/>
    {:catch error}
        <p style="color: red">Failed to generate SSH key</p>
    {/await}
{/if}


