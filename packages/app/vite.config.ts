import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from "vite-plugin-singlefile"
import * as path from "path"


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(), 
		viteSingleFile(),
	],
	resolve:{
		alias: {
			"$lib": path.join(__dirname, "src","lib"),
		}
	}
})
