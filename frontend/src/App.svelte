<script>
	import Form from './Form.svelte';
	import Test from './Test.svelte';
	import TravisBlock from './TravisBlock.svelte';

	async function getWebhook() {
		let response = await fetch('/api/webhook');
		return response.json().then(
			result => webhookUrl = result.webhook
		);
	}

	async function handleFormSubmit(event) {
		try {
			let response = await fetch('/api/rule', {
				method: 'POST',
				body: JSON.stringify(
					{
						name: event.detail.name, 
						address: event.detail.address, 
						pattern: event.detail.pattern
					}
				)
			})

			sshKey = (await response.json()).sshKey;
			generated = true;
		}
		catch {
			error = true;
		}
	}

	async function handleTestRequest(event) {
		try {
			let response = await fetch('/api/test', {
				method: 'POST',
				body: JSON.stringify(
					{
						name: event.detail.name, 
						address: event.detail.address, 
						pattern: event.detail.pattern
					}
				)
			})

			tested = (await response.json()).result ? true : false;
		}
		catch {
			error = true;
		}
	}

	let generated = false, tested = false, error = false;
	let sshKey = '';
	let webhookUrl;

	let promise = getWebhook();
	
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
</style>

<div id="content-box">

	{#await promise}
		<p>Getting webhook...</p>
	{:then result}
		<p style="color: green">Webhook: {result}</p>
		<Form on:submit={handleFormSubmit} disabled={generated}/>
		{#if generated}
			<Test {sshKey} on:submit={handleTestRequest} disabled={tested}/>
			{#if tested}
				<p style="color: green">Repository pulled successfully</p>
				<TravisBlock/>
			{:else if error}
			<p style="color: red">Failed to connect to the repository</p>
			{/if}
		{:else if error}
			<p style="color: red">Failed to generate SSH key</p>
		{/if}
	{:catch error}
		<p style="color: red">Failed to get webhook</p>
		<button on:click|preventDefault = "{() => promise = getWebhook()}">Try again</button>
	{/await}

</div>
