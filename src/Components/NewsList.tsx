import React, { FunctionComponent, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { NewsListItem } from './NewsListItem';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useNewsList } from './NewsListHooks';
import { branding } from './StyleGuide';

export const NewsList: FunctionComponent<{}> = () => {
  const { data, error, refreshing, loadingMore, loadNewData, loadMore } = useNewsList();

  useEffect(() => {
    loadNewData();
  }, [loadNewData]);

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
