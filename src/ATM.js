/**
 * Created by haconglinh on 11/24/16.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');

class ATM2 extends Component {

  constructor() {
    super();
    this.state = {
      actionText: 'Test',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180',
      },
      textSearch: 'ACB',
      // dataSource: new ListView.DataSource({
      //   rowHasChanged: (row1, row2) => row1 !== row2
      // })
    };
  }

  render() {

    return (

      <View>
        <ToolbarAndroid
          actions={toolbarActions}
          logo={require('./images/logo.png')}
          onActionSelected={this._onActionSelected}
          onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
          style={styles.toolbar}
          subtitle={this.state.actionText}
          title="Toolbar"/>

        <Text>{this.state.actionText}</Text>
      </View>
    );
  };

  _onActionSelected(position) {
  this.setState({actionText: 'Selected ' + toolbarActions[position].title,});
  }
}



var styles = StyleSheet.create({
  container: {},
  toolbar: {
    backgroundColor: '#689F38',
    height: 50,
  },
});


var toolbarActions = [
  // {title: 'Create', icon: require('./images/logo.png'), show: 'always'},
  {title: 'Range 1 Km'},
  {title: 'Range 2 Km'},
  {title: 'Range 3 Km'},
  {title: 'Range 4 Km'},
  {title: 'Range 5 Km'},
  {title: 'Range 6 Km'},
  {title: 'Range 7 Km'},
  {title: 'Range 8 Km'},
  {title: 'Range 9 Km'},
  {title: 'Range 10 Km'},
  {title: 'Range >10 Km'},

  // {title: 'Settings', icon: {uri: 'http://slacy.me/images/favicon.png'}, show: 'always'},
];


module.exports = ATM2;
