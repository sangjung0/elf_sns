import { useCallback, useState } from "react";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from "react-virtualized";

import Comment from './Comment';

const CommentModal = ({commentData, defaultHeight, loadMoreRows}) => {

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
        
        return (
            <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            rowIndex={index}
          >
            {({ measure }) => <div onLoad={()=>measure} style={style}> <Comment data={content} /></div>}
          </CellMeasurer>
        );
    },[commentData, cache]);

    return (
        <>
            <AutoSizer onResize={handleResize}>
                {({width, height}) => (
                    <List
                        autoHeight={true}
                        height={height}
                        width= {width}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowRenderer={rowRenderer}
                        rowCount={commentData.length}
                    />

                )}
            </AutoSizer>
            <div>
                <button onClick={loadMoreRows}>더보기</button>
            </div>
        </>
    )
}

export default CommentModal;