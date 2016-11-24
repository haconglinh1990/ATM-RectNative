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



var ATM = React.createClass({

  statics: {
    title: '<ToolbarAndroid>',
    description: 'Examples of using the Android toolbar.'
  },


  getInitialState: function(){
    return {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180',
      },
      typeATM: ''
    };
  },

  render() {






    return (

    <View title="<ToolbarAndroid>">
      <ToolbarAndroid
        actions={toolbarActions}
        logo={require('./images/logo.png')}
        onActionSelected={this._onActionSelected}
        onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
        style={styles.toolbar}
        subtitle={this.state.actionText}
        title="Toolbar" />
      <Text>{this.state.actionText}</Text>
    </View>


    // <ToolbarAndroid
    //   logo={require('./images/meomeo.jpg')}
    //   title="ATM"
    //   actions={[{title: 'Settings', icon: require('./images/cutoi.jpg'), show: 'always'}]}
    //   onActionSelected={this.onActionSelected} />,




    // <View style={styles.container}>
    //   <Text style={styles.welcome}>
    //     Type ATM {this.state.typeATM}.
    //   </Text>
    //
    //   <Picker
    //     selectedValue={this.state.language}
    //     onValueChange={(lang) => this.setState({language: lang})}>
    //     <Picker.Item label="Java" value="java" />
    //     <Picker.Item label="JavaScript" value="js" />
    //   </Picker>
    //
    //   <TextInput style={styles.input}
    //              onSubmitEditing={this._handleTextChange}/>
    // </View>



      //
      // <View style={styles.container}>
      //   <Text>
      //     ATM begining
      //   </Text>
      // </View>
    );
  },

  _onActionSelected: function(position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  },
});

var baseFontSize = 16;

var styles = StyleSheet.create({
  container: {


  },
  toolbar: {
    backgroundColor: '#fafafa',
    height: 56,
  },
});


var toolbarActions = [
  {title: 'Create', icon: require('./images/logo.png'), show: 'always'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Settings', icon: {uri: 'http://slacy.me/images/favicon.png'}, show: 'always'},
];




module.exports = ATM;
