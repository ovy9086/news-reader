import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamsList } from '../Navigation';
import { NewsItem } from '../Services/NewsApiService';
import { PressableCard } from './PressableCard';
import { branding } from './StyleGuide';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, 'Home'>;

export const NewsListItem: FunctionComponent<{ item: NewsItem }> = ({ item }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const date = new Date(item.publishedAt);
  return (
    <PressableCard
      style={styles.root}
      onPress={() => {
        navigation.navigate('Details', { item });
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={{ uri: item.urlToImage }} resizeMode={'cover'} />
      <View style={styles.details}>
        <Text style={styles.author}>{`${item.source?.name} - ${item.author ?? ''}`}</Text>
        <Text style={styles.date}>{date.toLocaleString()}</Text>
      </View>
    </PressableCard>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    marginHorizontal: branding.paddings.padding16,
    marginVertical: branding.paddings.padding8,
    borderRadius: branding.paddings.padding16,
    padding: branding.paddings.padding16
  },
  details: {
    flexDirection: 'row'
  },
  image: {
    marginVertical: branding.paddings.padding16,
    height: 140,
    width: '100%',
    borderRadius: branding.paddings.padding8
  },
  date: {
    fontSize: 13,
    textAlignVertical: 'bottom',
    color: branding.colors.lightGray
  },
  author: {
    fontSize: 13,
    flex: 1,
    textAlignVertical: 'bottom',
    color: branding.colors.lightGray
  },
  title: { fontSize: 16, letterSpacing: 1, fontWeight: '500' }
});
