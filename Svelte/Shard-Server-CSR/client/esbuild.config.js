import { build } from 'esbuild'
import devServer from 'esbuild-plugin-dev-server'
import sveltePreprocess from 'svelte-preprocess'
import sveltePlugin from 'esbuild-svelte'
import { sassPlugin } from 'esbuild-sass-plugin'

import fs from 'fs'

const env = process.env.NODE_ENV.trim() === 'development'

const envObj = {
    development:{
        outDir:'dist',
        minify:false,
        sourcemap:true,
        useDevServer:[
            devServer({
                public:'./dist',
                port: 8998,
                host:'0.0.0.0',
                beforeListen:() => console.log('\x1b[1;96mWaiting For Live Server Start ...\x1b[0;37m\n'),
                afterListen:server => {
                    const { port } = server.address()
                    console.log(`Live Server Url => \x1b[1;92mhttp://localhost:${port}\x1b[0;37m\r`)
                }
            })
        ]
    },
    production:{
        outDir:'build',
        minify:true,
        sourcemap:false,
        useDevServer:[]
    }
}[process.env.NODE_ENV.trim()]

build({
    entryPoints:['./src/entry.ts'],
    outfile:`./${envObj.outDir}/bundle.js`,
    format:'cjs',
    minify: envObj.minify,
    bundle: true,
    sourcemap: env.sourcemap,
    target: 'es2015',
    loader: {
        '.pem': 'text'
    },
    plugins:[
        sveltePlugin({ preprocess: sveltePreprocess({
            replace:[
                [/process\.env\.NODE_ENV/g, JSON.stringify(process.env.NODE_ENV)],
                [/process\.env\.API_URL/g, JSON.stringify(process.env.API_URL)]
            ],
        }) }),
        sassPlugin(),
        ...envObj.useDevServer
    ]
}).then(async () => {
    if(!env){
        await fs.promises.copyFile('./dist/index.html','./build/index.html')
        await fs.promises.copyFile('./dist/favicon.png','./build/favicon.png')
        console.log('\x1b[1;96mProduction Compile Done !\x1b[0;37m\r')
    }
}).catch(e => {
    console.log(e)
    process.exit(1)
}).catch(() => process.exit(1))