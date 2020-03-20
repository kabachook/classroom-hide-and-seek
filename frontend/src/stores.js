import { writable } from 'svelte/store';

export const webhookUrl = writable('');
export const sshKey = writable('');
export const name = writable('');
export const address = writable('');
export const pattern = writable('');
export const rulesList = writable('');