import { FunctionComponent } from "react";
import { useLocation } from "react-router";
import { cssSetPropertys } from './types'
import styles from './styles'
import RenderSearchActor from "../RenderSearchActor/RenderSearchActor";
import RenderSearchMovie from "../RenderSearchMovie/RenderSearchMovie";
import RenderSearchTv from "../RenderSearchTv/RenderSearchTv";

const { Show }: cssSetPropertys = styles

const RenderSearch: FunctionComponent<{}> = (): JSX.Element => {

    const { search }: { search: string } = useLocation()

    const useQuery: URLSearchParams = ((): URLSearchParams => new URLSearchParams(search))()

    const renderPage: (type: string) => JSX.Element | undefined = type => {
        switch (type) {
            case 'movie':
                return <RenderSearchMovie postSearchVal={useQuery.get('query')!} />
            case 'tv':
                return <RenderSearchTv postSearchVal={useQuery.get('query')!} />
            case 'actor':
                return <RenderSearchActor postSearchVal={useQuery.get('query')!} />
        }
    }
    return (
        <Show>
            <div className="container">
                <div className="search-item-outer">
                    {renderPage(useQuery.get('type')!)}
                </div>
            </div>
        </Show>
    )
}

export default RenderSearch