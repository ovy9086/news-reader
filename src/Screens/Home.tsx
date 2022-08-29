import React from 'react';
import { View } from 'react-native';
import { NewsList } from '../Components/NewsList';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <NewsList />
    </View>
  );
}
