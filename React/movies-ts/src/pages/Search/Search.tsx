import { useSearch } from "@tanstack/react-router";
import { SearchActor, SearchMovie, SearchTv } from "@/component";
import { StyledLayout } from '.'

const Search: FC = (): TSX => {

    const query = useSearch({ from: '/search' }) as {
        s: string,
        type: string
    }

    return (
        <StyledLayout>
            <div className="search-item-outer">
                {
                    {
                        [query.type]: (
                            <div className="error-type">
                                操作錯誤
                                <br />
                                無此搜尋類型
                            </div>
                        ),
                        movie: <SearchMovie />,
                        tv: <SearchTv />,
                        actor: <SearchActor />
                    }[query.type]
                }
            </div>
        </StyledLayout>
    )
}

export default Search