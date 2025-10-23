import { createGlobalStyle } from 'styled-components'
import imageBg from './images/bg.jpg'

export default createGlobalStyle`
    html{
        min-height: 100vh;

        &:before{
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            backdrop-filter: blur(5px) brightness(50%);
        }
        
        &:after{
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -2;
            background-image: url(${imageBg});
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        body{
            background-color: transparent;
        }
    }
`