/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, View, TextInput, Button } from 'react-native';

export default class ReactNativeGithubSearch extends Component {
  render() {
    return (
      <View style={{ marginTop: 180, paddingHorizontal: 20 }}>
        <TextInput
          style={{ height: 38, borderWidth: 1, borderColor: '#cccccc' }}
          placeholder="Search Github"
          />
        <Button
          onPress={() => console.log("Button on Press!!")}
          title="Search"
          />
      </View>
    );
  }
}

AppRegistry.registerComponent('ReactNativeGithubSearch', () => ReactNativeGithubSearch);
