<script>
    import { fly, fade } from 'svelte/transition';

    export let name;
    export let url;
    export let date;
    export let namePattern;
    export let sshKey;
</script>

<div class="Box-header d-flex flex-items-center">
	<div class="h3 text-gray-dark Box-title flex-auto">{name}</div>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">Git URL:</label>
    <span>{url}</span>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">Uploading date:</label>
    <span>{date}</span>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">Name pattern:</label>
    <span>{namePattern}</span>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">SSH key:</label>
    <span>{sshKey}</span>
</div>


