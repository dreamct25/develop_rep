import { build } from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import devServer from 'esbuild-plugin-dev-server'
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
                beforeListen:() => console.log('\x1b[1;96mWaiting For Live Server Start ...\x1b[0;37m\n'),
                afterListen:server => {
                    const { port } = server.address()
                    console.log(`Live Server Url => \x1b[1;92mhttp://localhost:${port}\x1b[0;37m\n`)
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
    format:'iife',
    minify: envObj.minify,
    bundle: true,
    sourcemap: env.sourcemap,
    loader: { '.html':'text' },
    target:['chrome58','safari11'],
    tsconfig: 'tsconfig.json',
    plugins:[
        sassPlugin({
            type: "css-text",
        }),
        ...envObj.useDevServer
    ]
}).then(() => {
    if(!env){
        fs.copyFileSync('./dist/index.html','./build/index.html')
        console.log('\x1b[1;96mProduction Compile Done !\x1b[0;37m\n')
    }
}).catch(e => {
    console.log(e)
    process.exit(1)
}).catch(() => process.exit(1))
