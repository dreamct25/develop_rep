import { build } from 'esbuild'
import devServer from 'esbuild-plugin-dev-server'
import sveltePreprocess from 'svelte-preprocess'
import sveltePlugin from 'esbuild-svelte'
import { sassPlugin } from 'esbuild-sass-plugin'
import babel from 'esbuild-plugin-babel'

import fs from 'fs'

const env = process.env.NODE_ENV

const envObj = {
    development:{
        outDir:'dist',
        minify:false,
        sourcemap:true,
        isDev: true,
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
        isDev: false,
        useDevServer:[]
    }
}[env]

console.log(envObj)

build({
    entryPoints:['./src/entry.ts'],
    outfile:`./${envObj.outDir}/bundle.js`,
    format: 'esm',
    minify: envObj.minify,
    bundle: true,
    sourcemap: env.sourcemap,
    target: ['es2020', 'safari14'],
    plugins:[
        sveltePlugin({ 
            preprocess: sveltePreprocess({
                replace:[
                    [/process\.env\.NODE_ENV/g, JSON.stringify(env)],
                    [/process\.env\.API_URL/g, JSON.stringify(process.env.API_URL)]
                ],
            }),
            compilerOptions: {
                css: 'injected',
                dev: env.isDev,
                hmr: env.isDev
            }
        }),
        babel({ 
            filter: /\.(js)$/,
            exclude: /node_modules/
        }),
        sassPlugin(),
        ...envObj.useDevServer,
    ]
}).then(async () => {

    if(!env.isDev){
        await fs.promises.copyFile('./dist/index.html','./build/index.html')
        await fs.promises.copyFile('./dist/favicon.png','./build/favicon.png')
        console.log('\x1b[1;96mProduction Compile Done !\x1b[0;37m\r')
    }
    
}).catch(e => {
    console.log(e)
    process.exit(1)
}).catch(() => process.exit(1))