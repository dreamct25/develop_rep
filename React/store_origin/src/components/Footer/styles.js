import styled from 'styled-components'
const cssAll = {
    Footers:styled.div`
       color: white;
       text-align: center;
       padding: 5px 10px;
       text-shadow: 0 2px 1px rgba(0,0,0,.7);
       font-style: italic;
       .footer-text{
           transition: .7s ease;
           transform: translateY(-40vh);
       }
       .footer-text-toggle{
           transform: translateY(0vh);
       }
    `
}

export default cssAll