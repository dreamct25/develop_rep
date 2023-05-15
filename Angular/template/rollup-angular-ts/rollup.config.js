import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
// import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { string as importToInlineString } from 'rollup-plugin-string'
import sass from 'rollup-plugin-sass'
import fs from 'fs'

const env = process.env.APP_ENV === 'development'

/** @type {import('rollup').RollupOptions} **/
export default {
    input:'src/entry.ts',
    output:{
        file: env ? 'dist/bundle.js' : 'build/bundle.js',
        format:'iife',
        sourcemap: env,
    
    },
    plugins:[
        nodeResolve({ extensions:['.js','.json','mjs'] }),
        replace({ 
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
            preventAssignment:true
        }),
        commonjs(),
        // babel({
        //     presets: ['@babel/preset-typescript'],
        //     exclude: 'node_modules/**',
        //     extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        // }),
        typescript({
            sourceMap: process.env.APP_ENV === 'development'
        }),
        sass({
            output: false,
            insert: false,
            includePaths: ['node_modules']
        }),
        importToInlineString({
            include: '**/*.html'
        }),
        ...env ? [
            livereload({ watch:'dist' }),
            serve({
                open:false,
                verbose:true,
                contentBase:['','dist'],
                host:'localhost',
                port:'9988',
                historyApiFallback:true
            })
        ] : [{
            generateBundle: () => {
                if(!env){
                    !fs.existsSync('./build') && fs.mkdirSync('./build')
                    fs.copyFileSync('./dist/index.html','./build/index.html')
                    console.log('\x1b[1;96mProduction Compile Done !\x1b[0;37m\n')
                }
            }
        }]
    ]
}