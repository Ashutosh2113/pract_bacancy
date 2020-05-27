import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import LabelWithInfo from '../components/labelWithInfo';

export default class SortByFilter extends React.PureComponent {
  render() {
    //console.log('1', this.props.data);
    //const {title, author, url, created_at_i} = this.props.data;
    return (
      <View>
        <Modal isVisible={this.props.sortByModel}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{backgroundColor: '#ffffff'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.setSortByFilter(1);
                }}
                style={
                  this.props.sortBy == 1
                    ? {backgroundColor: 'green'}
                    : {backgroundColor: '#ffffff'}
                }>
                <Text>Date ASC</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setSortByFilter(2);
                }}
                style={
                  this.props.sortBy == 2
                    ? {backgroundColor: 'green'}
                    : {backgroundColor: '#ffffff'}
                }>
                <Text>Date DES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
