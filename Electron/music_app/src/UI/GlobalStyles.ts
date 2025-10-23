import { css } from '@linaria/core'

export default css`
    :global() {

        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }

        /* HTML5 display-role reset for older browsers */

        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block;
        }

        body {
            line-height: 1;
        }

        ol,
        ul {
            list-style: none;
        }

        blockquote,
        q {
            quotes: none;
        }

        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
            content: '';
            content: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        *,
        *:before,
        *:after {
            box-sizing: border-box;
        }
        
        html{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;

            .custom-toast {
                top: 55px;
                z-index: 19;

                .Toastify__toast {

                    min-height: 100%;
                    background-color: rgba(30,30,30,.7);
                    backdrop-filter: blur(10px);
                    box-shadow: inset 0 0 2px 0 rgba(255,255,255, .5);

                    .Toastify__toast-body {
                        
                        div {
                            padding-top: 2px;
                            color: white;
                        }
                    }
                }
            }

            .rc-slider {

                .rc-slider-track {
                    background-color: rgba(0,162,255,1);
                    border-radius: 20px;
                }

                .rc-slider-handle {
                    border: 2px solid rgba(0,162,255,1);
                    opacity: 1;

                    &.rc-slider-handle-dragging {
                        border: 2px solid rgba(0,162,255,1);
                        box-shadow: unset;
                        transform: scale(1.2) translateX(-50%) !important;
                    }
                }

                .tooltip {
                    padding: 4px 0 5px 0;
                    width: 40px;
                    color: white;
                    background: rgb(30,30,30);
                    border-radius: 5px;
                    text-align: center;
                    transform: scale(.8) translate(-19px,-41px);
                    opacity: 0;
                    z-index: -1;
                    transition: .5s ease;
                        
                    &:before {
                        content: "";
                        position: absolute;
                        border-top: 8px solid rgb(30, 30, 30);
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        top: 97%;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }

                &:hover {

                    .tooltip {
                        opacity: 1;
                        z-index: 1;
                    }
                }
            }
        }
    }
`