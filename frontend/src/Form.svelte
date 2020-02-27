<script>
    import { createEventDispatcher } from 'svelte';
    import { name, address, pattern, sshKey } from './stores.js';
    import Test from './Test.svelte';

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
    .generation-form {
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
    }
</style>

<form class="generation-form">
    <label for="name">Enter name</label>
    <input type="text" bind:value={$name} required {disabled}>

    <label for="address">Enter repository address</label>
    <input type="text" bind:value={$address} {disabled}>

    <label for="pattern">Enter pattern</label>
    <input type="text" bind:value={$pattern} {disabled}>

    <button disabled={disabled || inputError} on:click|preventDefault={handleFormSubmit}>Generate key</button>

    {#if inputError}
        <div id="form-error-box">Empty fields aren't allowed</div>
    {/if}

    {#if promise}
        {#await promise}
            <p>Generating SSH key...</p>
        {:then result}
            <Test {$sshKey}/>
        {:catch error}
            <p style="color: red">Failed to generate SSH key</p>
        {/await}
    {/if}

    
</form>


