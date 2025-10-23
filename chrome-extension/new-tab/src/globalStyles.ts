import { css } from '@linaria/core'

export default css`
    @font-face {
        font-family: 'Segoeui_Custom';
        src: url('/assets/font/segoeui.ttf') format('truetype');
        font-style: normal;
        font-display: auto;
    }
    :global() {
        /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
        */

        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        html {
            font-family: Segoeui_Custom !important;
            background-color: rgb(30,30,30);
        }

        body {
            position: relative;
            background-position: center center;
            background-image: var(--bg);
            transition: .5s ease;
        }

        body.bg-fill {
            background-size: cover;
            background-repeat: no-repeat;
        }

        body.bg-tile {
            background-repeat: repeat;
            background-size: contain;
        }

        body.bg-fit{
            background-repeat: no-repeat;
            background-size: contain;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                backdrop-filter: blur(10px);
                background-color: rgba(30,30,30,.3);
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                background-image: var(--bg);
                z-index: -2;
                transition: .5s ease;
            }
        }
    }
`