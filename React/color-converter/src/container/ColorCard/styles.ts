import styled from 'styled-components'
import { containerType } from '.'

const container:containerType = styled.div`
    .color-card-outer-frame{
        .color-card-outer{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
            grid-gap: 10px;
            padding: 50px 10px;
        
            .color-card-item{
                position: relative;
                height: 160px;
                border-radius: 5px;
                overflow: hidden;
                box-shadow: 0 0 6px 0 rgba(0,0,0,.5);
                background-color: rgba(255,255,255,.5);
                backdrop-filter: blur(10px);
        
                .card-content-mask{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    border-radius: 0 0 5px 5px;
                    font-size: 15px;
                    color: white;
                    padding: 4px 7px 5px 7px;
                    line-height: 25px;
                    text-shadow: 1px 1px 3px rgba(0,0,0,.7);
                    background-color: rgba(255,255,255,.5);
                    opacity: 0;
                    transition: .5s ease;
                }

                &:hover{
                    .card-content-mask{
                        opacity: 1;
                    }
                }
            }
        }
    }
`

export default container