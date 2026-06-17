import { useState, useRef, useEffect, useContext } from 'react';
import { NewContext } from '@/App'
import { MoreLoadingMsg, ScanLine } from '.'

interface Props<T> {
    mountedElement: Element | Document;
    list: T[];
    pageSize: number;
    currentPage?: number;
    totalPages?: number,
    triggerOffset?: number;
    isFloatLoadingText?: boolean
    loadingText?: string,
    renderList: (items: T[]) => TSX;
    loadMoreResultHandler?: (...args: any) => Promise<void>;
}

const InfinitiScroll = <T,>({
    mountedElement,
    list,
    pageSize,
    currentPage = 0,
    totalPages = 0,
    triggerOffset = 0,
    isFloatLoadingText = true,
    loadingText = '讀取列表中',
    renderList,
    loadMoreResultHandler
}: Props<T>): TSX => {

    const { $ } = useContext(NewContext)

    const [displayCount, setDisplayCount] = useState(pageSize);
    const [loading, setLoading] = useState(false);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout>(undefined);
    const items = list.slice(0, displayCount);
    const hasMore = loadMoreResultHandler ? currentPage < totalPages :  displayCount < list.length;

    const loadMore:() => Promise<void> = async () => {

        if (loading || !hasMore) return;

        setLoading(true);

        if(loadMoreResultHandler) await loadMoreResultHandler()

        // 模擬延遲載入
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setDisplayCount(prev => prev + pageSize);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {

        if (!sentinelRef.current) return;

        const observer = $.elementObserver(
            [sentinelRef.current],
            {
                watchRootElement: mountedElement,
                triggerPos: `${triggerOffset}px`,
            },
            entry => {
                if (entry.isIntersecting) loadMore()
            }
        )

        observer.allWatch()

        return () => observer.allUnWatch()
        
    }, [loading]);

    return (
        <>
            {items.length > 0 && renderList(items)}
            <MoreLoadingMsg
                className={loading ? 'active' : ''}
                isFloatLoadingText={isFloatLoadingText}
            >
                {loadingText}
            </MoreLoadingMsg>
            {hasMore && <ScanLine ref={sentinelRef} />}
        </>
    );
};

export default InfinitiScroll;