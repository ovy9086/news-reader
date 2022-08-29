import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { branding } from '../Components/StyleGuide';
import { RootStackParamsList } from '../Navigation';

type RouteProps = RouteProp<RootStackParamsList, 'Details'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamsList, 'Details'>;

export default function DetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const item = route.params.item;
  const date = new Date(item.publishedAt);
  return (
    <View>
      <Image style={styles.header} source={{ uri: item.urlToImage }} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{`Published at ${date.toLocaleString()}`}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WebView', {
              url: item.url,
              title: item.source?.name ?? item.title
            });
          }}
        >
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
    width: '100%'
  },
  content: { padding: branding.paddings.padding8 },
  title: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1.5,
    marginVertical: branding.paddings.padding8
  },
  date: {
    color: branding.colors.lightGray
  },
  description: {
    fontSize: 18,
    letterSpacing: 1,
    marginVertical: branding.paddings.padding8,
    color: branding.colors.gray
  },
  readMore: {
    paddingVertical: branding.paddings.padding4,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
