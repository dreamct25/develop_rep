import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io'
import api from './src/api'
import socketApi from './src/api/socketApi'


/** @type {import('vite').Plugin} */
const expressApiServer = {
	name:'express',
	configureServer(server){
		server.middlewares.use('/',api)
	}
}

/** @type {import('vite').Plugin} */
const socketIOServer = {
	name:'websocket',
	configureServer(server){
		const io = new Server(server.httpServer)
		io.on('connection',socketApi)
	}
}

/** @type {import('vite').UserConfig} */
const config = {
	server:{
		port: 9621,
		host: '0.0.0.0'
	},
	plugins: [expressApiServer,socketIOServer,sveltekit()]
};

export default config;
