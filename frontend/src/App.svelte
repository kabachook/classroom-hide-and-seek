<script>
	import Form from './Form.svelte';
	import TestList from './TestList.svelte';
	import { webhookUrl } from './stores.js';
	import { fly } from 'svelte/transition';

	let promise;
	let hiddenForm = true;

	function getWebhook() {
		promise = fetch('/api/webhook')
		.then(
			result => result.json()
		).then(
			result => {
				if (result.webhook) {
					$webhookUrl = result.webhook;
				}
				else {
					throw new Error();
				}
			}
		);
	}

	function addNewTest() {
		hiddenForm = false;
		getWebhook();
	}
	
</script>

<style>
	/* :global(body) {
		font-family: Arial, Helvetica, sans-serif;
		padding: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	#content-box {
        border: 1px solid rgb(128, 128, 128);
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
	} */

</style>

<header class="Header bg-white">
	<p class="Header-item h1 text-gray-dark">🚀 Testing system</p>
</header>

<div id="content-box" class="container d-flex clearfix">

	<TestList on:addNewTest={addNewTest}/>

	<div class="col-lg-8 col-md-7 col-sm-6 ml-3" hidden={hiddenForm}>
		<div class="Box Box--condensed">
			<div class="Box-header d-flex flex-items-center">
				<div class="h2 text-gray-dark Box-title flex-auto"> Upload new test</div>

				{#if promise}

					{#await promise}
						<div class="h5 text-right text-yellow">Getting webhook...</div>
					{:then result}
						<div class="h5 text-right text-green" in:fly="{{y:20, duration: 300}}">Webhook: {$webhookUrl}</div>
					{:catch error}
						<div class="h5 text-right text-red p-1" in:fly="{{y:20, duration: 300}}">
							Failed to get webhook
						</div>
						<button class="btn btn-sm" on:click|preventDefault = {getWebhook}>Try again</button>
					{/await}

				{/if}
			</div>

			{#if promise}
				{#await promise then result}
					<Form/>
				{/await}
			{/if}
		</div>
	</div>
</div>
