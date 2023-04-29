import { styled } from "@linaria/react";

export default styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .bottom{
        display: flex;
        font-size: 20px;
        align-items: center;
        padding: 5px 10px;
        position: fixed;
        bottom: 0;
        right: 0;

        .row{
            a{
                font-weight: 500;
                color: #646cff;
                text-decoration: inherit;

                .logo {
                    will-change: filter;
                    transition: 0.75s;
                    height: 30px;
                    padding: unset;

                    .tauri{

                        &:hover {
                            filter: drop-shadow(0 0 2em #24c8db);
                        }
                    }

                    
                }

                &:nth-of-type(2){
                    .logo{
                        padding:0 10px;
                    }
                }

                &:hover {
                    color: #535bf2;
                }
            }
            
        }

        .txt{
            padding-right: 10px;
        }
    }
`