import React from "react";
import { Container } from '.'

const Error404:FC = ():TSX => (
    pug`
        Container
            .desc
                .top
                    i(class="fas fa-times-circle")
                    div Error 404
                .bottom Not Found Page
                    
    `
)

export default Error404