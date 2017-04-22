# react-native-hands-on

第72回 Cocoa勉強会関西  - React Native ハンズオン用レポジトリ

## 目次

- [このテキストの読み方](#このテキストの読み方)
- [準備](#準備)
- [step-0 Wellcome to 大阪!](#step-0-Wellcome-to-大阪!)
- [step-1 検索画面を作る](#step-1-検索画面を作る)
- [step-2 検索ワードを取得する](#step-2-検索ワードを取得する)
- [step-3 検索結果画面に遷移する](#step-3-検索結果画面に遷移する)
- [step-4 APIを使って検索する](#step-4-APIを使って検索する)
- [step-5 検索結果をTableViewに表示する](#step-5-検索結果をTableViewに表示する)
- [step-6 カスタムCellを作成してタップでWebViewを開く](#step-6-カスタムCellを作成してタップでWebViewを開く)


## このテキストの読み方

このテキストでは、既にあるファイルの編集を表現するために `diff` という形式を利用します。  
例えば、次のdiffは「 `テクスト` を `テキスト` に修正し、 `yo` という行を追加する」という編集内容をあらわしています。

```diff
これは
-テクスト
+テキスト
です
+yo
```

## 準備

### git clone

最初にこのレポジトリを `git clone` します。  
依存ライブラリもインストールしておきましょう。

以下のコマンドを順番にターミナルに入力し、実行してください。  
(`$` は入力しません)

```
$ git clone https://github.com/niwatako/react-native-hands-on
$ cd react-native-hands-on
$ npm install
```

### アプリを起動する


Xcodeで `react-native-hands-on/ios/ReactNativeGithubSearch.xcodeproj` を開いて実行してください。

## step-0 Wellcome to 大阪! `git checkout step-0`

```diff
export default class ReactNativeGithubSearch extends Component {
     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>
-          Welcome to React Native!
+          Welcome to 大阪!
         </Text>
         <Text style={styles.instructions}>
           To get started, edit index.ios.js
```

## step-0 Wellcome to 大阪! 

```
git checkout step-0
```

```diff
     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>
-          Welcome to React Native!
+          Welcome to 大阪!
         </Text>
         <Text style={styles.instructions}>
           To get started, edit index.ios.js
```

## step-1 検索画面を作る 

```
git checkout step-1
```

```diff
  */
 
 import React, { Component } from 'react';
-import {
-  AppRegistry,
-  StyleSheet,
-  Text,
-  View
-} from 'react-native';
+import { AppRegistry, View, TextInput, Button } from 'react-native';
 
 export default class ReactNativeGithubSearch extends Component {
   render() {
     return (
-      <View style={styles.container}>
-        <Text style={styles.welcome}>
-          Welcome to 大阪!
-        </Text>
-        <Text style={styles.instructions}>
-          To get started, edit index.ios.js
-        </Text>
-        <Text style={styles.instructions}>
-          Press Cmd+R to reload,{'\n'}
-          Cmd+D or shake for dev menu
-        </Text>
+      <View style={{ marginTop: 180, paddingHorizontal: 20 }}>
+        <TextInput
+          style={{ height: 38, borderWidth: 1, borderColor: '#cccccc' }}
+          placeholder="Search Github"
+          />
+        <Button
+          onPress={() => console.log("Button on Press!!")}
+          title="Search"
+          />
       </View>
     );
   }
 }
 
-const styles = StyleSheet.create({
-  container: {
-    flex: 1,
-    justifyContent: 'center',
-    alignItems: 'center',
-    backgroundColor: '#F5FCFF',
-  },
-  welcome: {
-    fontSize: 20,
-    textAlign: 'center',
-    margin: 10,
-  },
-  instructions: {
-    textAlign: 'center',
-    color: '#333333',
-    marginBottom: 5,
-  },
-});
-
 AppRegistry.registerComponent('ReactNativeGithubSearch', () => ReactNativeGithubSearch);

```

## step-2 検索ワードを取得する 

```
git checkout step-2
```

```diff
 import React, { Component } from 'react';
 import { AppRegistry, View, TextInput, Button } from 'react-native';
 
 export default class ReactNativeGithubSearch extends Component {
-  render() {
+  constructor(props) {
+    super(props);
+    this.state = { text: '' };
+  }
+
+  render () {
     return (
       <View style={{ marginTop: 180, paddingHorizontal: 20 }}>
         <TextInput
           style={{ height: 38, borderWidth: 1, borderColor: '#cccccc' }}
           placeholder="Search Github"
+          onChangeText={(text) => this.setState({text: text})}
           />
         <Button
-          onPress={() => console.log("Button on Press!!")}
+          onPress={() => this.onPressSearch(this.state.text)}
+          disabled={this.state.text.length < 1}
           title="Search"
           />
       </View>
     );
   }
+
+  onPressSearch(search_words) {
+    console.log(search_words);
+  }
 }
 
 AppRegistry.registerComponent('ReactNativeGithubSearch', () => ReactNativeGithubSearch);

```

## step-3 検索結果画面に遷移する 

```
git checkout step-3
```

```diff
  */
 
 import React, { Component } from 'react';
-import { AppRegistry, View, TextInput, Button } from 'react-native';
+import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text } from 'react-native';
+
+class RootView extends Component {
+  render() {
+    return (
+      <NavigatorIOS
+        initialRoute={{component: ReactNativeGithubSearch, title: "Github Repository Search"}}
+        style={{flex: 1}}
+        />
+    )
+  }
+}
+
+class SearchResultsView extends Component {
+  constructor(props) {
+    super(props);
+    this.state = { search_words: props.search_words };
+  }
+
+  render () {
+    return (
+      <Text style={{marginTop: 180}}>{this.state.search_words}</Text>
+    );
+  }
+}
 
 export default class ReactNativeGithubSearch extends Component {
   constructor(props) {
@@ -31,8 +55,12 @@ export default class ReactNativeGithubSearch extends Component {
   }
 
   onPressSearch(search_words) {
-    console.log(search_words);
+    this.props.navigator.push({
+      title: "検索結果",
+      component: SearchResultsView,
+      passProps: {search_words: search_words}
+    });
   }
 }
 
-AppRegistry.registerComponent('ReactNativeGithubSearch', () => ReactNativeGithubSearch);
+AppRegistry.registerComponent('ReactNativeGithubSearch', () => RootView);

```

## step-4 APIを使って検索する 

```
git checkout step-4
```

```diff
 class SearchResultsView extends Component {
     this.state = { search_words: props.search_words };
   }
 
+  componentWillMount() {
+    this.fetchApiAsync()
+  }
+
   render () {
     return (
       <Text style={{marginTop: 180}}>{this.state.search_words}</Text>
     );
   }
+
+  fetchApiAsync() {
+    const url = "https://api.github.com/search/repositories?q=" + encodeURIComponent(this.state.search_words);
+    return fetch(url)
+    .then((response) => response.json())
+    .then((responseJson) => {
+      const repositories = responseJson.items
+      if (repositories) {
+        for (var i = 0; i < repositories.length; i ++) {
+          console.log(repositories[i].full_name);
+        }
+      }
+    })
+    .catch((error) => {
+      console.error(error);
+    });
+  }
 }
 
 export default class ReactNativeGithubSearch extends Component {

```

## step-5 検索結果をTableViewに表示する 

```
git checkout step-5
```

```diff
  */
 
 import React, { Component } from 'react';
-import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text } from 'react-native';
+import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text, ListView } from 'react-native';
 
 class RootView extends Component {
   render() {
@@ -21,7 +21,11 @@ class RootView extends Component {
 class SearchResultsView extends Component {
   constructor(props) {
     super(props);
-    this.state = { search_words: props.search_words };
+    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
+    this.state = {
+      repositories: [],
+      search_words: props.search_words
+    };
   }
 
   componentWillMount() {
@@ -30,7 +34,15 @@ class SearchResultsView extends Component {
 
   render () {
     return (
-      <Text style={{marginTop: 180}}>{this.state.search_words}</Text>
+      <View style={{flex: 1, paddingTop: 22}}>
+        <ListView
+          dataSource={this.dataSource.cloneWithRows(this.state.repositories)}
+          renderRow={ (repository) =>
+            <Text>{repository.full_name}</Text>
+          }
+          enableEmptySections
+          />
+      </View>
     );
   }
 
@@ -41,9 +53,7 @@ class SearchResultsView extends Component {
     .then((responseJson) => {
       const repositories = responseJson.items
       if (repositories) {
-        for (var i = 0; i < repositories.length; i ++) {
-          console.log(repositories[i].full_name);
-        }
+        this.setState({ repositories: repositories });
       }
     })
     .catch((error) => {

```

## step-6 カスタムCellを作成してタップでWebViewを開く 

```
git checkout step-6
```

```diff
  */
 
 import React, { Component } from 'react';
-import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text, ListView } from 'react-native';
+import { AppRegistry, NavigatorIOS, View, TextInput, Button, Text, ListView, Image, TouchableHighlight, WebView } from 'react-native';
 
 class RootView extends Component {
   render() {
@@ -38,7 +38,10 @@ class SearchResultsView extends Component {
         <ListView
           dataSource={this.dataSource.cloneWithRows(this.state.repositories)}
           renderRow={ (repository) =>
-            <Text>{repository.full_name}</Text>
+            <RepositoryCell
+              repository={repository}
+              onPress={() => this.openRepositoryURL(repository)}
+              />
           }
           enableEmptySections
           />
@@ -46,6 +49,14 @@ class SearchResultsView extends Component {
     );
   }
 
+  openRepositoryURL(repository) {
+    this.props.navigator.push({
+      title: repository.full_name,
+      component: WebView,
+      passProps: {source: {url: repository.html_url}}
+    });
+  }
+
   fetchApiAsync() {
     const url = "https://api.github.com/search/repositories?q=" + encodeURIComponent(this.state.search_words);
     return fetch(url)
@@ -62,6 +73,31 @@ class SearchResultsView extends Component {
   }
 }
 
+class RepositoryCell extends Component {
+  constructor(props) {
+    super(props);
+    this.state = {
+      repository: props.repository,
+      onPress: props.onPress,
+    }
+  }
+  render() {
+    return (
+      <TouchableHighlight onPress={this.state.onPress} underlayColor='#EEE'>
+        <View style={{flexDirection: 'row', paddingTop: 6}}>
+          <View style={{paddingTop: 2, paddingHorizontal: 10, paddingBottom: 20}}>
+            <Image source={{ uri: this.state.repository.owner.avatar_url }} style={{width: 40, height: 40}}/>
+          </View>
+          <View style={{flex: 1}}>
+            <Text style={{fontSize: 14, color: '#333'}}>{this.state.repository.full_name}</Text>
+            <Text style={{fontSize: 12, color: '#666', paddingTop: 3, paddingRight: 6, paddingBottom: 10, paddingLeft: 0}}>{this.state.repository.description}</Text>
+          </View>
+        </View>
+      </TouchableHighlight>
+    )
+  }
+}
+
 export default class ReactNativeGithubSearch extends Component {
   constructor(props) {
     super(props);

```


ハンズオンは以上です！お疲れ様でした！！

質問等は [にわタコ(@niwatako)](https://twitter.com/niwatako) またはIssueへお寄せください！
