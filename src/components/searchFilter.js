import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default class SearchFilter extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <TextInput
          value={this.props.value}
          onChangeText={text => {
            this.props.changedText(text);
          }}
          style={styles.inputStyle}
        />
        <TouchableOpacity
          onPress={() => {
            if (
              !(
                this.props.appliedFilterQuery == this.props.value &&
                this.props.value.length > 0
              )
            ) {
              this.props.applyFilter();
            } else {
              this.props.clearFilter();
            }
          }}>
          <Text>
            {this.props.appliedFilterQuery == this.props.value &&
            this.props.value.length > 0
              ? 'clear'
              : 'apply'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            this.props.showSortByModel();
          }}>
          <Image
            style={{width: 20, height: 20}}
            resizeMode={'cover'}
            source={
              this.props.sortBy == 1
                ? require('../assets/images/asc.png')
                : require('../assets/images/des.png')
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    //backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
});
