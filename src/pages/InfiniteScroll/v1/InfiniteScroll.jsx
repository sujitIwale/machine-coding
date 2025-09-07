import { useCallback, useEffect, useRef, useState } from 'react';
import './InfiniteScroll.css';
import { throttle } from '../../../utils';

const MAX_PAGE = 5;

const getData = (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from(
          { length: 20 },
          (_, i) => `Item ${(page - 1) * 20 + i + 1}`
        ),
        hasMore: page < MAX_PAGE,
      });
    }, 2000);
  });
};

const InfiniteScrollV1 = () => {
  const loadingRef = useRef();
  const currentPage = useRef(0);
  const containerRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    (page) => {
      console.log('fetch triggered');
      if (loadingRef.current || !hasMore) return;
      setLoading(true);
      loadingRef.current = true;
      console.log('fetching data');
      getData(page).then((res) => {
        setData((prev) => [...prev, ...res.data]);
        setLoading(false);
        setHasMore(res.hasMore);
        loadingRef.current = false;
        currentPage.current = page;
      });
    },
    [hasMore]
  );

  console.log({ currentPage: currentPage.current, hasMore });

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (loadingRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      console.log({
        scrollTop,
        clientHeight,
        scrollHeight,
        distanceFromBottom,
      });

      if (distanceFromBottom <= 150 && !loadingRef.current) {
        fetchData(currentPage.current + 1);
      }
    };

    const throttledScroll = throttle(handleScroll, 100); // Reduced throttle delay
    container.addEventListener('scroll', throttledScroll);

    return () => {
      container.removeEventListener('scroll', throttledScroll);
    };
  }, [fetchData]);

  return (
    <div className="main-container">
      <div className="items-container" ref={containerRef}>
        {data.map((item, index) => (
          <div className="item" key={index}>
            {item}
          </div>
        ))}
        {hasMore ? <div>loading ...</div> : <div>List ended</div>}
      </div>
    </div>
  );
};

export default InfiniteScrollV1;
