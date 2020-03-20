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
					return Promise.reject();
				}
			}
		);
	}

	function addNewTest() {
		hiddenForm = false;
		getWebhook();
	}
	
</script>

<header class="Header bg-white">
	<p class="Header-item h1 text-gray-dark">🚀 Testing system</p>
</header>

<div id="content-box" class="container d-flex clearfix">

	<TestList on:addNewTest={addNewTest}/>

	<div class="col-lg-7 col-md-6 col-sm-5 ml-3 mr-3" hidden={hiddenForm}>
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
