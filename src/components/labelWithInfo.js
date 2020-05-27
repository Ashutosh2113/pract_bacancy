import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class LabelWithInfo extends React.PureComponent {
  render() {
    return (
      <View style={{flex: 1, marginBottom: 10}}>
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 13, fontWeight: '700'}}>
            {this.props.title}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, color: 'grey'}}>
            {this.props.infomation}
          </Text>
        </View>
      </View>
    );
  }
}
