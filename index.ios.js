/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text, ListView, Image, TouchableHighlight, WebView } from 'react-native';

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
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      repositories: [],
      search_words: props.search_words
    };
  }

  componentWillMount() {
    this.fetchApiAsync()
  }

  render () {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.repositories)}
          renderRow={ (repository) =>
            <RepositoryCell
              repository={repository}
              onPress={() => this.openRepositoryURL(repository)}
              />
          }
          enableEmptySections
          />
      </View>
    );
  }

  openRepositoryURL(repository) {
    this.props.navigator.push({
      title: repository.full_name,
      component: WebView,
      passProps: {source: {url: repository.html_url}}
    });
  }

  fetchApiAsync() {
    const url = "https://api.github.com/search/repositories?q=" + encodeURIComponent(this.state.search_words);
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      const repositories = responseJson.items
      if (repositories) {
        this.setState({ repositories: repositories });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

class RepositoryCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: props.repository,
      onPress: props.onPress,
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.state.onPress} underlayColor='#EEE'>
        <View style={{flexDirection: 'row', paddingTop: 6}}>
          <View style={{paddingTop: 2, paddingHorizontal: 10, paddingBottom: 20}}>
            <Image source={{ uri: this.state.repository.owner.avatar_url }} style={{width: 40, height: 40}}/>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 14, color: '#333'}}>{this.state.repository.full_name}</Text>
            <Text style={{fontSize: 12, color: '#666', paddingTop: 3, paddingRight: 6, paddingBottom: 10, paddingLeft: 0}}>{this.state.repository.description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
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
