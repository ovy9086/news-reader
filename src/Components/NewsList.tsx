import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { NewsListItem } from './NewsListItem';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { branding } from './StyleGuide';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { loadMoreDataAsync, loadNewDataAsync } from '../Store/newsSlice';

export const NewsList: FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.news.data);
  const error = useAppSelector(state => state.news.error);
  const refreshing = useAppSelector(state => state.news.refreshing);
  const loadingMore = useAppSelector(state => state.news.loadingMore);
  const currentPage = useAppSelector(state => state.news.currentPage);

  useEffect(() => {
    console.log('Load new data on mount...');
    dispatch(loadNewDataAsync());
  }, [dispatch]);

  const loadNewData = useCallback(() => dispatch(loadNewDataAsync()), [dispatch]);
  const loadMore = useCallback(() => {
    //Do not load items from bottom while refreshing, alreading loading more, or while initial data is not loaded
    if (data.length > 0 && (!refreshing || !loadingMore)) {
      console.log('onEndReached=>Load more data async...');
      dispatch(loadMoreDataAsync(currentPage));
    }
  }, [refreshing, loadingMore, dispatch, currentPage, data]);

  return error ? (
    <View style={styles.errorContainer}>
      <Text style={styles.error}>{error}</Text>
      <Button title='Try again' onPress={loadNewData} />
    </View>
  ) : (
    <FlashList
      estimatedItemSize={100}
      data={data}
      keyExtractor={item => item.title}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : undefined}
      refreshing={refreshing}
      onRefresh={loadNewData}
      onEndReachedThreshold={0.2}
      onEndReached={loadMore}
      renderItem={renderData => <NewsListItem item={renderData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    padding: branding.paddings.padding16,
    justifyContent: 'center'
  },
  error: {
    color: 'red',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    marginBottom: 12
  }
});
