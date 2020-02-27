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
</style>

{#await promise}
	<p>Generating yaml...</p>
{:then result}
	<p>Insert this code in basic <code>travis.yml</code></p>
    <textarea id="travis" cols="30" rows="8" readonly>{yaml}</textarea>
{:catch error}
	<p style="color: red">Failed to generate yaml</p>
{/await}