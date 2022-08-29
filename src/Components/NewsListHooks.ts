import { useState, useCallback } from 'react';
import { NewsItem, newsApiService } from '../Services/NewsApiService';

export const useNewsList = () => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadNewData = useCallback(() => {
    console.log('Fetch new items...');
    setRefreshing(true);
    newsApiService.headlines().then(res => {
      setRefreshing(false);
      if (res.status === 'error') {
        setError(res.message ?? 'Unknown error');
      } else {
        setError(undefined);
        console.log('RESPONSE', res);
        setData(d => {
          const currentIds = d.map(it => it.url);
          const newItems = res.articles.filter(it => !currentIds.includes(it.url));
          console.log('Loaded new items:', newItems.length);
          return [...newItems, ...d];
        });
      }
    });
  }, []);

  const loadMore = () => {
    if (loadingMore || refreshing) {
      //Skip if already loading
      return;
    }

    setLoadingMore(true);
    newsApiService.headlines(page + 1).then(res => {
      setLoadingMore(false);
      if (res.status === 'error') {
        setError(res.message ?? 'Unknown error');
      } else {
        setData(d => [...d, ...res.articles]);
        setPage(p => p + 1);
      }
    });
  };
  return { data, error, refreshing, loadingMore, loadNewData, loadMore };
};
