<script>
	import Form from './Form.svelte';
	import { webhookUrl } from './stores.js';

	let promise;

	function getWebhook() {
		promise = fetch('/api/webhook')
		.then(
			result => result.json()
		).then(
			result => {
				$webhookUrl = result.webhook;
			}
		);
	}

	getWebhook();
	
</script>

<style>
	:global(body) {
		font-family: Arial, Helvetica, sans-serif;
		padding: 20px;
		width: 100%;
	}

	#content-box {
        border: 1px solid rgb(128, 128, 128);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		width: 50%;
	}

	:global(button) {
		width: fit-content;
	}

</style>

<div id="content-box">

	{#await promise}
		<p>Getting webhook...</p>
	{:then result}
		<p>Webhook: <span style="color: green">{$webhookUrl}</span></p>
		<Form/>
	{:catch}
		<p style="color: red">Failed to get webhook</p>
		<button on:click|preventDefault = {getWebhook}>Try again</button>
	{/await}

</div>
