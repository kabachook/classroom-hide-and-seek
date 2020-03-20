<script>
    import { fly, fade } from 'svelte/transition';

    export let name;
    export let gitUrl;
    export let date;
    export let pattern;
    export let sshKey;
</script>

<div class="Box-header d-flex flex-items-center">
	<div class="h3 text-gray-dark Box-title flex-auto">{name}</div>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">Git URL:</label>
    <span class="break-word">{gitUrl}</span>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">Uploading date:</label>
    <span class="break-word">{date}</span>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">Name pattern:</label>
    <span class="break-word">{pattern}</span>
</div>
<div class="Box-row d-flex flex-items-center">
    <label class="m-1">SSH key:</label>
    <span class="break-word">{sshKey}</span>
</div>


