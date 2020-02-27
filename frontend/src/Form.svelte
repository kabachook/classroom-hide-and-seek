<script>
    import { createEventDispatcher } from 'svelte';

    export let disabled = false;

	const dispatch = createEventDispatcher();

    let name, address, pattern;

    $: errored = !(name && address && pattern);

	function submit() {
        if (errored) {
            return;
        }

		dispatch('submit', {
            name,
            address,
            pattern
		});
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
        font-size: 0.8rem;
    }

    button {
        display: block;
    }
</style>

<form class="generation-form">
    <label for="name">Enter name</label>
    <input type="text" bind:value={name} required {disabled}>

    <label for="address">Enter repository address</label>
    <input type="text" bind:value={address} {disabled}>

    <label for="pattern">Enter pattern</label>
    <input type="text" bind:value={pattern} {disabled}>

    <button disabled={errored || disabled} on:click|preventDefault={submit}>Generate key</button>

    {#if errored}
    <div id="form-error-box">Empty fields aren't allowed</div>
    {/if}
</form>


