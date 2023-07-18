import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import typscript from '@rollup/plugin-typescript'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'

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
        replace({ 
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
            preventAssignment:true
        }),
        vue(),
        scss(),
        commonjs(),
        babel({
            presets: ['@babel/preset-typescript'],
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        }),
        typscript({
            tsconfig: 'tsconfig.json'
        }),
        livereload({ watch:'dist' }),
        serve({
            open:true,
            verbose:true,
            contentBase:['','public'],
            host:'localhost',
            port:'9988'
        })
    ]
}