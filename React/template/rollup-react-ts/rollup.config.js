import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import linaria from '@linaria/rollup'
import css from 'rollup-plugin-css-only';

/** @type {import('rollup').RollupOptions} **/
export default {
    input : "src/entry.tsx",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true
    },
    plugins:[
        nodeResolve({ extensions: [".js",".json",".mjs"] }),
        replace({ 
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
            preventAssignment:true
        }),
        linaria({ sourceMap:false }),
        babel({ 
            presets:[
                "@babel/preset-typescript",
                "@babel/preset-react"
            ],
            extensions:['.js', '.jsx', '.ts', '.tsx']
        }),
        css({ output: 'styles.css' }),
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        commonjs(),
        serve({
            open: true,
            verbose: true,
            contentBase:["","public"],
            host: "localhost",
            port: '8877'
        }),
        livereload({ watch:"dist" })
    ]
}