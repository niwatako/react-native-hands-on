/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text } from 'react-native';

class RootView extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{component: ReactNativeGithubSearch, title: "Github Repository Search"}}
        style={{flex: 1}}
        />
    )
  }
}

class SearchResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = { search_words: props.search_words };
  }

  render () {
    return (
      <Text style={{marginTop: 180}}>{this.state.search_words}</Text>
    );
  }
}

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
    this.props.navigator.push({
      title: "検索結果",
      component: SearchResultsView,
      passProps: {search_words: search_words}
    });
  }
}

AppRegistry.registerComponent('ReactNativeGithubSearch', () => RootView);
