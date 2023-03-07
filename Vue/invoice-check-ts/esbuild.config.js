import { build } from 'esbuild'
import devServer from 'esbuild-plugin-dev-server'
import decodeVue from 'esbuild-plugin-vue3'
import fs from 'fs'

const env = process.env.APP_ENV.trim() === 'development'

const envObj = {
    development:{
        outDir:'dist',
        minify:true,
        sourcemap:true,
        useDevServer:[
            devServer({
                public:'./dist',
                port: 8998,
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
    entryPoints:['./src/entry.ts'],
    outfile: `./${envObj.outDir}/bundle.js`,
    format:'cjs',
    minify: envObj.minify,
    bundle:true,
    sourcemap: envObj.sourcemap,
    target:['chrome58','safari11'],
    plugins:[
        decodeVue(),
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
