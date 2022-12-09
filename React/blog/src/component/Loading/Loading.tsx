import React from 'react'
import { Container } from '.'

const Loading:FC<{ loadingStatus:boolean }> = ({ loadingStatus }):TSX => pug`
    Container(loadingStatus=loadingStatus)
        .loading
            .loading-circle
                svg(className="fsg",width="100%",height="100%")
                    defs
                        linearGradient(id="a1",x1="0%",y1="0%",x2="100%",y2="100%")
                            stop(offset="10%",stopColor="rgb(255,255,255)")
                            stop(offset="50%",stopColor="rgb(200,200,200)",stopOpacity=".5")
                            stop(offset="70%",stopColor="rgb(0,0,0)",stopOpacity="0")
                            stop(offset="90%",stopColor="rgb(0,0,0)",stopOpacity="0")
                            stop(offset="100%",stopColor="rgb(0,0,0)",stopOpacity="0")
                    circle(cx="105",cy="105",r="100",strokeWidth="6",stroke="url(#a1)",fill="none")
            .loading-text Loading
`

export default Loading