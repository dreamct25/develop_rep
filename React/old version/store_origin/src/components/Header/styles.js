import styled from 'styled-components'
const cssAll = {
    HeadersOuter:styled.div`
    .header{
        color: white;
        display: flex;
        align-items: center;
        padding: 12px 10px 5px 10px;
        text-shadow: 0 2px 1px rgba(0,0,0,.7);
        font-style: italic;
        .header-icon{
            font-size: 35px;
            margin: 0 5px;
        }
        h1{
            margin: 0 5px;
        }
    }
    @media screen and (max-width:414px){
        .header{
            justify-content: center;
            padding: 18px 10px 5px 10px;
        }
    }
    `
}

export default cssAll