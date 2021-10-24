import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Tileview from './Tileview';

// Tab controller
export const FirstRoute = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{flex: 1, backgroundColor: '#ff4081'}}>
    <Tileview city="Rio de Janeiro" />
  </View>
);

export const SecondRoute = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{flex: 1, backgroundColor: '#673ab7'}}>
    <Tileview city="Beijing" />
  </View>
);
export const ThirdRoute = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{flex: 1, backgroundColor: '#673ab7'}}>
    <Tileview city="Los Angeles" />
  </View>
);

export default function Tab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Rio de Janeiro'},
    {key: 'second', title: 'Beijing'},
    {key: 'third', title: 'Los Angeles'},
  ]);
  //${}

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
