import { WindowScroller } from 'react-virtualized';

import InfiniteScroll from './InfiniteScroll';

const WindowInfiniteScroll = ({contentsData, loadPage, defaultHeight, defaultLoadPage, totalPage, children}) => {
    //콘텐츠 데이터, 콘텐츠 페이지 로드 함수, 콘텐츠 기본 높이, 한번에 로드할 페이지 수, 총 페이지 수

    return (
        <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <InfiniteScroll {...{contentsData, loadPage, defaultHeight, defaultLoadPage, totalPage, children}} windowScrollerProps={{height, isScrolling,onScroll: onChildScroll, scrollTop, autoHeight:true}}>
                    {children}
                </InfiniteScroll>
            )}
        </WindowScroller>
    )
}

export default WindowInfiniteScroll;