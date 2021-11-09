import { FunctionComponent } from "react";
import { useLocation } from "react-router";
import { StyledComponent } from "styled-components";
import styles from './styles'
import RenderSearchActor from "../RenderSearchActor/RenderSearchActor";
import RenderSearchMovie from "../RenderSearchMovie/RenderSearchMovie";
import RenderSearchTv from "../RenderSearchTv/RenderSearchTv";

const { Show }:{ Show: StyledComponent<"div", any, {}, never> } = styles

const RenderSearch: FunctionComponent<{}> = (): JSX.Element => {

    const { search }: { search: string } = useLocation()

    const useQurey = ((): URLSearchParams => new URLSearchParams(search))()

    const renderPage: Function = (type: string): JSX.Element | void => {
        switch (type) {
            case 'movie':
                return <RenderSearchMovie postSearchVal={useQurey.get('query')!} />
            case 'tv':
                return <RenderSearchTv postSearchVal={useQurey.get('query')!} />
            case 'actor':
                return <RenderSearchActor postSearchVal={useQurey.get('query')!} />
        }
    }
    return (
        <Show>
            <div className="container">
                <div className="search-item-outer">
                    {renderPage(useQurey.get('type'))}
                </div>
            </div>
        </Show>
    )
}

export default RenderSearch