/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, View, TextInput, Button } from 'react-native';

export default class ReactNativeGithubSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render () {
    return (
      <View style={{ marginTop: 180, paddingHorizontal: 20 }}>
        <TextInput
          style={{ height: 38, borderWidth: 1, borderColor: '#cccccc' }}
          placeholder="Search Github"
          onChangeText={(text) => this.setState({text: text})}
          />
        <Button
          onPress={() => this.onPressSearch(this.state.text)}
          disabled={this.state.text.length < 1}
          title="Search"
          />
      </View>
    );
  }

  onPressSearch(search_words) {
    console.log(search_words);
  }
}

AppRegistry.registerComponent('ReactNativeGithubSearch', () => ReactNativeGithubSearch);
