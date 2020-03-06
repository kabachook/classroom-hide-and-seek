<script>
    let yaml;
    let promise = fetch('/api/travis', {
        method: 'POST',
        body: JSON.stringify(
            {}
        )
    }).then(
        result => result.json().then(
            result => yaml = result.code
        )
    );
</script>

<style>
    textarea {
        resize: none;
    }
</style>

{#await promise}
	<p>Generating code...</p>
{:then result}
	<p>Insert this code in <code>travis.yml</code>:</p>
    <textarea id="travis" cols="30" rows="8" readonly>{yaml}</textarea>
{:catch error}
	<p style="color: red">Failed to generate yaml code</p>
{/await}