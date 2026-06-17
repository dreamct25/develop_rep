import { styled } from '@linaria/react'

export default styled.div`
    
    .search-item-outer{
        padding-top: 35px;
        max-width: 960px;
        margin: 0 auto;

        .error-type {
            color: white;
            height: calc(100vh - 50px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            line-height: 28px;
            letter-spacing: 2px;
        }
    }
`