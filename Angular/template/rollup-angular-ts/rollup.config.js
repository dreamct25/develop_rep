import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
// import babel from '@rollup/plugin-babel'
// import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { string as importToInlineString } from 'rollup-plugin-string'
import sass from 'rollup-plugin-sass'

/** @type {import('rollup').RollupOptions} **/
export default {
    input:'src/entry.ts',
    output:{
        file:'dist/bundle.js',
        format:'iife',
        sourcemap:true,
    },
    plugins:[
        nodeResolve({ extensions:['.js','.json','mjs'] }),
        // replace({ 
        //     'process.env.NODE_ENV': JSON.stringify( 'development' ),
        //     preventAssignment:true
        // }),
        commonjs(),
        // babel({
        //     presets: ['@babel/preset-typescript'],
        //     exclude: 'node_modules/**',
        //     extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        // }),
        typescript(),
        sass({
            output: false,
            insert: false,
            includePaths: ['node_modules']
        }),
        // css(),
        importToInlineString({
            include: '**/*.html'
        }),
        livereload({ watch:'dist' }),
        serve({
            open:false,
            verbose:true,
            contentBase:['','public'],
            host:'localhost',
            port:'9988'
        })
    ]
}