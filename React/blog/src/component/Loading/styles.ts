import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${({ loadingStatus }:{ loadingStatus:boolean }) => loadingStatus ? 1 : 0};
    z-index: ${({ loadingStatus }:{ loadingStatus:boolean }) => loadingStatus ? 15 : -1};
    transition: .5s ease;
    backdrop-filter: blur(10px);
    background-color: rgba(30,30,30,.5);

    .loading-circle{
        svg{
            width: 210px;
            height: 210px;
            transform:rotate(0deg);
            animation: loadingFram 1s linear infinite;
        }
        
        @keyframes loadingFram {
            0%{
                transform:rotate(0deg);
            }
            100%{
                transform:rotate(360deg);
            }
        }
    }

    .loading-text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        letter-spacing: 3px;
        font-style: italic;
        color: white;
        font-weight: bold;
        font-size: 18px;
    }
`