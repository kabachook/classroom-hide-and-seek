import { writable, readable } from 'svelte/store';

export const webhookUrl = writable('');
export const sshKey = writable('');
export const name = writable('');
export const address = writable('');
export const pattern = writable('');

export const remoteServerUrl = readable('http://box.danil.co:5000');