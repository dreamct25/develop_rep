import styled from 'styled-components'

export default styled.div`
    .pagination-outer {
        ul{
            margin:0;
            .page-link {
                z-index: unset !important;
                background-color: rgba(0, 0, 0, 0.7);
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                padding: 3px 0 3px 0;
                border-radius: 12px;
                margin: 0 3px 0 3px;
                width: 40px;
                text-align:center;
                border: none;
                color: white;
                transition: .7s ease;
                span {
                    display: block;
                    font-size: 11px;
                    padding: 3px 0 4px 0;
                }
            }
            .page-link:hover {
                color: black !important;
                background-color: rgba(255, 255, 255, 0.9) !important;
            }
            .active{
                color: black;
                background-color: rgba(255, 255, 255, 0.9);
            }
            .page-item:first-child {
                .page-link {
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                    background-color: rgba(150, 150, 150, 0.7);
                }
                .page-link-active {
                    background-color: rgba(0, 0, 0, 0.7);
                }
            }
            .page-item:last-child {
                .page-link {
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                    background-color: rgba(150, 150, 150, 0.7);
                }
                .page-link-active {
                    background-color: rgba(0, 0, 0, 0.7);
                }
            }
        }
    }
`