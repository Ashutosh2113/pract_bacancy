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

export default class ItemDetails extends React.PureComponent {
  render() {
    //console.log('1', this.props.data);
    const {title, author, url, created_at_i} = this.props.data;
    return (
      <View>
        <Modal isVisible={this.props.isVisible}>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <View
              style={{
                alignSelf: 'flex-end',
                marginRight: 10,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModel();
                }}>
                <View>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView style={{flex: 1, padding: 10}}>
              <LabelWithInfo title={'Title'} infomation={title} />
              <LabelWithInfo title={'Author'} infomation={author} />
              <LabelWithInfo title={'Link'} infomation={url} />
              <LabelWithInfo
                title={'Created On'}
                infomation={new Date(created_at_i * 1000).toDateString()}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
