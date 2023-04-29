/** @type {import('snowpack').SnowpackUserConfig} **/
export default {
    mount:{
        public:'/',
        src:'/'
    },
    devOptions:{
        port:9977,
        hostname: 'localhost',
        open: 'none'
    },
    plugins:["@snowpack/plugin-svelte"]
}