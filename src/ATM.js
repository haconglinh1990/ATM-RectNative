/**
 * Created by haconglinh on 11/24/16.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ScrollView,
  Dimensions,
} from 'react-native';

var {height, width} = Dimensions.get('window');
var ToolbarAndroid = require('ToolbarAndroid');
var MyToolbar = require('./MyToolbar');

class ATM extends Component {

  constructor() {
    super();
    this.state = {
      toolbarSwitch: false,
      textSearch: 'ACB',
      isLoading: true,
      position: {
        coords: {}
      },
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position:position});
        console.log(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 200000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({position: position});
    });
  }


  fetchData() {
    var REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=21.0063779,105.8001757&radius=1000&type=atm&key=AIzaSyAnsboAkwpEceSlixe4JrGKEOlhhWw1iTo';
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.results),
        isLoading: false
      });
    })
    .done();
  }

  renderLocation(location) {
    return (
      <TouchableHighlight>
        <View>
          <View style={styles.listViewContainer}>
            <Image
              source={{uri: location.icon}}
              style={styles.icon} />
            <View style={styles.rightContainer}>
              <Text style={styles.nameATM} numberOfLines={2}>{location.name}</Text>
              <Text style={styles.distance}>Khoảng cách: {this.distance(
                this.state.position.coords.latitude,
                this.state.position.coords.longitude,
                location.geometry.location.lat,
                location.geometry.location.lng
              )} m.</Text>
              <Text style={styles.address} numberOfLines={3}>{location.vicinity}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    var navigationView = (
      <ScrollView>
        <View style = {{height:height, backgroundColor:'white'}}>
          <View style = {{height:200, backgroundColor:'#689F38', justifyContent:'center', marginBottom: 3}}>
            <Text style = {{height:30, color:'white', fontSize:25, marginLeft:120}}>ATM</Text>
          </View>
          <View style = {{height:100, backgroundColor:'white', justifyContent:'center', marginBottom: 3, marginLeft:120}}>
            <Image
              source={require('./images/voz2.png')}
              style={styles.icon} />
          </View>
          <View style = {{height:70, backgroundColor:'white', justifyContent:'center', marginBottom: 3}}>
            <Text style = {{height:30, color:'black', fontSize:24, marginLeft:20}}>Tác giả: Hà Công Linh</Text>
          </View>

        </View>

      </ScrollView>
    );

    return (
      <View>
        <DrawerLayoutAndroid
          style={styles.drawerLayout}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
          ref={'DRAWER'}>
          <MyToolbar title={'                ATM'}
                     navigator={this.props.navigator}
                     sidebarRef={()=>this._setDrawer()}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderLocation.bind(this)}
            style={styles.listView}
          />
        </DrawerLayoutAndroid>
      </View>
    );
  };

  _setDrawer() {
    this.refs['DRAWER'].openDrawer();
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Text>Loading Location !!!</Text>
      </View>
    );
  }

  distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1151.5
    return dist.toFixed(2)
  }
}

var styles = StyleSheet.create({
  listViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10},
    drawerLayout: {
    backgroundColor: '#689F38',
    height: height,
  },
  icon: {
    width: 81,
    height: 81,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  },
  nameATM: {
    fontSize: 20,
    marginBottom: 8
  },
  distance: {
    color: '#656565'
  },
  address: {
    color: '#656565'
  },
  smallSeparator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  separator: {
    height: 4,
    backgroundColor: '#dddddd'
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = ATM;
