import { build } from 'esbuild'
import DevServer from 'esbuild-plugin-dev-server'
import linaria from '@linaria/esbuild'
import babel from 'esbuild-plugin-babel'
import { sassPlugin } from 'esbuild-sass-plugin'
import path from 'path'
import fs from 'fs'

const env = process.env.APP_ENV.trim() === 'development'

const envObj = {
    development:{
        outDir:'dist',
        minify:false,
        sourcemap:true,
        useDevServer:[
            DevServer({
                public:'./dist',
                port: 9988,
                beforeListen:() => console.log('Waiting For Live Server Start ...'),
                afterListen:server => {
                    const { port } = server.address()
                    console.log(`Live Server Url => http://localhost:${port}`)
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
}[process.env.APP_ENV.trim()]

build({
    entryPoints:['./src/entry.tsx'],
    outfile: `./${envObj.outDir}/bundle.js`,
    minify: envObj.minify,
    bundle: true,
    sourcemap: envObj.sourcemap,
    format:'cjs',
    target:['chrome58','safari11'],
    plugins:[
        linaria(),
        sassPlugin(),
        babel({
            config: {
                presets:[
                    '@babel/preset-typescript',
                    '@babel/preset-react',
                    '@linaria/babel-preset',
                ],
                compact: false
            }
        }),
        ...envObj.useDevServer
    ]
}).then(() => {
    if(!env){
        fs.copyFileSync('./dist/index.html','./build/index.html')
        console.log('production compile Done !')
    }
}).catch(e => {
    console.log(e)
    process.exit(1)
})