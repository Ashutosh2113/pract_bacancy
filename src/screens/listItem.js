import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class ListItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {title, created_at_i, url, author} = this.props.data;
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          this.props.setDetails(this.props.data);
        }}>
        <View style={{flex: 1, padding: 10}}>
          <View style={styles.itemMainInfo}>
            <View style={{flex: 1}}>
              <Text numberOfLines={2} style={{fontSize: 18, fontWeight: '700'}}>
                {title}
              </Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text>{new Date(created_at_i * 1000).toDateString()}</Text>
            </View>
          </View>
          <View style={{marginBottom: 5}}>
            <Text numberOfLines={2}>{url}</Text>
          </View>
          <View style={{marginBottom: 5}}>
            <Text style={styles.author} numberOfLines={1}>
              {author}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemMainInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  author: {
    color: 'red',
    fontWeight: '700',
  },
});
