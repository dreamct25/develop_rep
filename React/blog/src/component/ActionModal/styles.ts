import styled from "styled-components";

export default styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30,30,30,.5);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    opacity: ${({ toggleModalStatus }:{ toggleModalStatus:boolean }) => toggleModalStatus ? 1 : 0};
    z-index: ${({ toggleModalStatus }:{ toggleModalStatus:boolean }) => toggleModalStatus ? 10 : -1};;
    transition: .5s ease;

    .action-modal-outer{
        background-color: white;
        overflow: hidden;
        border-radius: 8px;
        width: 95%;
        max-width: 500px;

        .action-modal-header{
            padding: 8px 10px 6px 10px;
            font-size: 24px;
            font-weight: bold;
        }

        .action-modal-body{
            padding: 12px;
        }

        .action-modal-footer{
            display: flex;
            justify-content: flex-end;
            margin: 5px;

            div{

                &:last-child{
                    margin-left: 5px;
                }

                border-radius: 5px;
                padding: 4px 10px;
                box-shadow: 0 0 0 1px rgba(30,30,30,.3);
                cursor: pointer;
                user-select: none;
            }
        }

        hr{
            margin: 0;
        }
    }
`