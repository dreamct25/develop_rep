import { useState, useRef, useEffect, useContext } from 'react';
import { NewContext } from '@/App'
import { MoreLoadingMsg, ScanLine } from '.'

interface Props<T> {
    mountedElement: Element | Document;
    list: T[];
    pageSize: number;
    triggerOffset?: number;
    isFloatLoadingText?: boolean
    loadingText?: string,
    renderList: (items: T[]) => TSX;
}

const InfinitiScroll = <T,>({
    mountedElement,
    list,
    pageSize,
    triggerOffset = 0,
    isFloatLoadingText = true,
    loadingText = '讀取列表中',
    renderList
}: Props<T>): TSX => {

    const { $ } = useContext(NewContext)

    const [displayCount, setDisplayCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout>(undefined);

    const items = list.slice(0, displayCount);
    const hasMore = displayCount < list.length;
    
    const loadMore = () => {

        if (loading || !hasMore) return;

        setLoading(true);

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
        
    }, [list]);

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