import App from './App.svelte';
import { makeServer } from "./server.js.js";

makeServer();

var app = new App({
	target: document.body
});

export default app;