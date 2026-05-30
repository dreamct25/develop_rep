import { useContext } from 'react'
import { NewContext } from '@/App'
import { StyledLayout, type SingleEbookDataType } from '.'

const SingleEbookInfoModal:FC<{
    toggleSingleEbookModalStatus: boolean
    setToggleSingleEbookModalStatus: () => void
    singleData: SingleEbookDataType | undefined
}> = (props): TSX => {

    const { $ } = useContext(NewContext)

    return (
        <StyledLayout 
            className={
                props.toggleSingleEbookModalStatus ? 
                    'single-ebook-info-modal-outer-frame toggle' : 
                    'single-ebook-info-modal-outer-frame'
            }
            onClick={({ target }) => {
                const element = target as HTMLDivElement
                const elementClassList = $.createArray({ type: 'new', item: element.classList })
                
                if(
                    elementClassList.includes('single-ebook-info-modal-outer-frame')
                ) props.setToggleSingleEbookModalStatus()
            }}
        >
            <div className="single-ebook-info-modal-outer">
                {props.singleData ? 
                    (
                        <div className="single-ebook-item">
                            <div className="single-ebook-item-title">
                                <div className="item-title">
                                    <div>{props.singleData.trackName}</div>
                                    <div>{props.singleData.artistName}</div>
                                </div>
                                <div className="price">{props.singleData.formattedPrice}</div>
                            </div>
                            <div className="singel-ebook-item-content">
                                <div className="img-outer">
                                    <img src={props.singleData.artworkUrl100.replace(/100x100/g,"720x1280")} alt=""/>
                                </div>
                                <div className="single-ebook-item-explain">
                                    <div className="explain-groups">
                                        <div>分類：{props.singleData.genres.length === 0 ? '無' : props.singleData.genres.join(" , ")}</div>
                                        <div>出版時間：{$.formatDateTime({ formatDate: props.singleData.releaseDate, formatType: 'yyyy-MM-dd' })}</div>
                                    </div>
                                    <div className="descript-outer">
                                        <div className="descript-title">
                                            <span>內容說明</span>
                                        </div>
                                        <div className="descript-text-outer">
                                            <div className="descript-text">
                                                <span>{props.singleData.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='load-text'>讀取資料中</div>
                    )
                }
            </div>
        </StyledLayout>
    )
}

export default SingleEbookInfoModal