import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typscript from '@rollup/plugin-typescript'
import decodeJson from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import swc from '@rollup/plugin-swc'
import minify from '@rollup/plugin-terser'
import fs from 'fs'
import fsExtra from 'fs-extra'

const env = process.env.APP_ENV === 'development'

/** @type {import('rollup').RollupOptions} **/
export default {
    input:'src/entry.ts',
    output:{
        file: env ? 'public/js/bundle.js' : 'build/js/bundle.min.js',
        format:'iife',
        sourcemap: env
    },
    plugins:[
        nodeResolve({ extensions:['.js','.json','mjs'] }),
        replace({ 
            'process.env.NODE_ENV': JSON.stringify(process.env.APP_ENV),
            'process.env.APP_API': JSON.stringify(process.env.APP_API),
            preventAssignment:true
        }),
        ...!env ? [minify()] : [],
        decodeJson(),
        vue(),
        scss({
            output: env ? 'public/css/bundle.css' : 'build/css/bundle.min.css',
            outputStyle: !env ? 'compressed' : 'expanded'
        }),
        commonjs(),
        swc(),
        typscript({ sourceMap: env,tsconfig: 'tsconfig.json' }),
        ...env ? [
            livereload({ watch:'public' }),
            serve({
                open:true,
                verbose:true,
                contentBase:['','public'],
                host:'localhost',
                port:'9988',
                historyApiFallback:true
            })
        ] : [{
            buildStart:() => {
                if(env) return

                fs.existsSync('build') && fsExtra.removeSync('build')
                fs.mkdirSync('build')
            },
            generateBundle: () => {
                if(env) return
                
                const orginHTML = fs.readFileSync('public/index.html').toString('utf8')

                const newHTML = orginHTML
                    .replace('/css/bundle.css','/cash/css/bundle.min.css')
                    .replace('/js/bundle.js','/cash/js/bundle.min.js')

                fs.writeFileSync('./build/index.html',newHTML)

                console.log('\x1b[1;96mProduction Compile Done !\x1b[0;37m\n')
            }
        }]
    ]
}