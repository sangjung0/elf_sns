import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List, WindowScroller } from 'react-virtualized';
import { useCallback, useState } from 'react';

import Content from './Content';

const InfiniteScroll = ({contentsData, loadPage}) => {
    const [cache, setCache] = useState(
        new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 885,
        })
    );
    const rowCount = contentsData.length + (contentsData.length >= 100 ? 0 : 10);

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

    const isRowLoaded = useCallback(({ index })=>{
        return !!contentsData[index];
    },[contentsData])
      
    const loadMoreRows = useCallback(() => {
        loadPage();
    },[loadPage]);
      
    const rowRenderer = useCallback(({ index, key, parent, style }) => {
        const content = contentsData[index];
        
        return (
            <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            rowIndex={index}
          >
            {({ measure }) => (
                <Content data={content} onLoad={()=>measure} parentStyle={style}/>
            )}
          </CellMeasurer>
        );
    },[contentsData, cache]);

    return (
        <InfiniteLoader 
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
        >
            {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <AutoSizer disableHeight onResize={handleResize}>
                            {({width}) => (
                                <List
                                    autoHeight={true}
                                    height={height}
                                    width= {width}
                                    isScrolling={isScrolling}
                                    onScroll={onChildScroll}
                                    scrollTop={scrollTop}
                                    deferredMeasurementCache={cache}
                                    rowHeight={cache.rowHeight}
                                    rowRenderer={rowRenderer}
                                    rowCount={rowCount}
                                    ref={registerChild}
                                    onRowsRendered={onRowsRendered}
                                />
                            )}
                        </AutoSizer>
                    )}
                </WindowScroller>
            )}
        </InfiniteLoader>
    )
}

export default InfiniteScroll;