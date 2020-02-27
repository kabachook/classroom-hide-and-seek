<script>
    import { createEventDispatcher } from 'svelte';

    export let sshKey;
    export let disabled;

	const dispatch = createEventDispatcher();
    
    function submit() {
		dispatch('submit', {});
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
    <input id="ssh-box" readonly value={sshKey}>
    <button on:click|preventDefault={submit} disabled={disabled}>Test</button>
</div>






