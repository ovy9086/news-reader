import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { WebView as RNWebview } from 'react-native-webview';
import { RootStackParamsList } from '../Navigation';

type RouteProps = RouteProp<RootStackParamsList, 'WebView'>;

export default function WebView() {
  const route = useRoute<RouteProps>();
  return <RNWebview style={{ flex: 1 }} source={{ uri: route.params.url }} />;
}
