<script>
    let yaml;
    let promise = fetch('/api/travis', {
        method: 'POST',
        body: JSON.stringify(
            {}
        )
    }).then(
        result => result.json()
    )
    .then(
        result => {
            if (!result.code) {
                return Promise.reject();
            }
            yaml = result.code;
        }
    );
</script>

<style>
    textarea {
        resize: none;
    }
</style>

<div class="Box-body">
    {#await promise}
        <div class="Box-row">
            <p class="flash">Generating code...</p>
        </div>
    {:then result}
        <div class="Box-row">
            <label>Insert this code in <code>.travis.yml</code>:</label>
            <textarea class="form-control width-full" readonly>{yaml}</textarea>
        </div>
    {:catch error}
        <div class="Box-row">
            <p class="flash flash-error">Failed to generate yaml code</p>
        </div>
    {/await}
</div>