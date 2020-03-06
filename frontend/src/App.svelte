<script>
	import Form from './Form.svelte';
	import TestList from './TestList.svelte';
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	#content-box {
        /* border: 1px solid rgb(128, 128, 128); */
		display: grid;
		grid-template-columns: 1fr 4fr;
		column-gap: 1rem;

		padding: 0.5rem;
		width: 100%;
		height: 95%;
	}

	:global(button) {
		width: fit-content;
	}

	header > p {
		font-size: 2rem;
		margin: 0;
		padding: 20px;
	}

</style>

<header>
	<p>🚀 Testing system</p>
</header>

<div id="content-box">

	<TestList/>

	<div style="padding: 5px">
		<p style="font-size: 1.5rem"> Upload new test</p>
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
</div>
