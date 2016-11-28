/**
 * Created by haconglinh1990 on 26/11/2016.
 */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');

class MyToolbar extends Component {
  render() {
    // var navigator = this.props.navigator;
    return (
      <ToolbarAndroid
        title={this.props.title}
        navIcon={require('./images/ic_menu_white_24dp.png')}
        style = {styles.toolbar}
        titleColor={'white'}
        onIconClicked={this.props.sidebarRef}/>
    );
  };
}



const styles = StyleSheet.create({
//define your own style
  toolbar: {
    backgroundColor: '#689F38',
    height: 50,
  },
});
module.exports = MyToolbar;