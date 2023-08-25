import { useCallback, useState } from "react";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from "react-virtualized";

import Comment from './Comment';

const CommentModal = ({ commentData, defaultHeight, loadMoreRows }) => {
    // const [showMoreFlag, setShowMoreFlag] = useState(true)
    const handleShowMore = () => {
        loadMoreRows()
        // setShowMoreFlag(!showMoreFlag)
        // setCache(new CellMeasurerCache({
        //     fixedWidth: true,
        //     defaultHeight: defaultHeight + commentData.length * 51
        // }))
    }

    const [cache, setCache] = useState(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: defaultHeight,
        })
    );
    const handleResize = useCallback(
        ({ width }) => {
            setCache((prevCache) => {
                return new CellMeasurerCache({
                    fixedWidth: true,
                    defaultHeight: prevCache.defaultHeight,
                    defaultWidth: width
                });
            });
        },
        []
    );

    const rowRenderer = useCallback(({ index, key, parent, style }) => {
        const content = commentData[index];
        console.log('content', content)
        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                rowIndex={index}
            >
                {({ measure }) => <div onLoad={() => measure} style={style}> <Comment data={content} /></div>}
            </CellMeasurer>
        );
    }, [commentData, cache]);

    return (
        <>
            <AutoSizer onResize={handleResize}>
                {({ width, height }) => (
                    <List
                        autoHeight={true}
                        height={height}
                        width={width}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowRenderer={rowRenderer}
                        rowCount={commentData.length}
                    />

                )}
            </AutoSizer>
            {/* {showMoreFlag && <button onClick={loadMoreRows}>더보기1</button>} */}
            {/* {showMoreFlag && <button onClick={handleShowMore}>더보기2</button>} */}
            {/* <button onClick={loadMoreRows}>더보기3</button> */}
            <button onClick={handleShowMore}>더보기4</button>
        </>
    )
}

export default CommentModal;