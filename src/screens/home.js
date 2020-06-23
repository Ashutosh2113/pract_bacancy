import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {axiosGet, axiosGetCustomUrl} from '../services/APICalls';
import ListItem from './listItem';
import ItemDetails from './detailsModel';
import SearchFilter from '../components/searchFilter';
import SortByFilter from './sortByFilter';
import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';

//const x = [{id: '1'}, {id: '2'}];
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filteredData: [],
      page_no: 1,
      isVisible: false,
      details: {},
      isRefreshing: false,
      isFilterApplied: false,
      fliterQuery: '',
      appliedFilterQuery: '',
      sortBy: 1,
      sortByModel: false,
      source: '',
    };
  }
  componentDidMount() {
    //this.sequentialCall();
    this.getBlobFile();
    // const filePath = RNFetchBlob.fs.dirs.DownloadDir;
    // const fileName = new Date().getTime();
    // const fullPath = filePath + '/' + fileName + '.pdf';
    // console.log('===>2', RNFetchBlob.fs);
  }
  getBlobFile = async () => {
    const data = await axiosGetCustomUrl(
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    );
    //const blobData = new Blob([data]);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External storage permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(data);
        fileReaderInstance.onload = async () => {
          let base64data = fileReaderInstance.result;
          var Base64Code = base64data.split(';base64,');
          const fs = RNFetchBlob.fs;
          const filePath = fs.dirs.DownloadDir;
          const fileName = new Date().getTime();
          const fullPath = filePath + '/' + fileName + '.pdf';
          await fs.createFile(fullPath, Base64Code[1], 'base64');
        };
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  sequentialCall = () => {
    let that = this;
    let callAPI = true;
    (function loop(i) {
      if (callAPI)
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            const data = await axiosGet(
              `search_by_date?tags=story&page=${that.state.page_no}`,
            );
            const newData = that.state.data.concat(data.hits);
            that.setState({
              page_no: that.state.page_no + 1,
              data: newData,
              isRefreshing: false,
            });
            if (data.hits && data.hits.length > 0) {
              resolve();
            } else {
              callAPI = false;
            }
            console.log(1);
          }, 3000);
        }).then(loop.bind());
    })(0);
  };
  showDetails = details => {
    console.log('1', details);
    this.setState({
      isVisible: true,
      details: details,
    });
  };
  closeModel = () => {
    this.setState({isVisible: false});
  };
  changedText = text => {
    this.setState({
      fliterQuery: text,
    });
  };
  applyFilter = () => {
    if (this.state.fliterQuery != '') {
      console.log('Filter data based on Query');
      const filteredData = this.state.data.filter(v => {
        if (
          v.title.toLowerCase().search(this.state.fliterQuery.toLowerCase()) !=
            -1 ||
          v.author.toLowerCase().search(this.state.fliterQuery.toLowerCase()) !=
            -1
        ) {
          return true;
        }
      });
      this.setState({
        isFilterApplied: true,
        appliedFilterQuery: this.state.fliterQuery,
        filteredData: filteredData,
      });
    } else {
      console.log('Clear fliter');
      this.clearFilter();
    }
  };
  clearFilter = () => {
    this.setState({
      isFilterApplied: false,
      appliedFilterQuery: '',
      fliterQuery: '',
      filteredData: [],
    });
  };
  showSortByModel = () => {
    //console.log('1');
    this.setState({
      sortByModel: true,
    });
  };
  render() {
    let listData = this.state.isFilterApplied
      ? this.state.filteredData
      : this.state.data;
    listData = _.orderBy(
      listData,
      ['created_at_i'],
      [this.state.sortBy == 1 ? 'asc' : 'desc'],
    );

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, alignSelf: 'flex-start', padding: 10}}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SearchFilter
              appliedFilterQuery={this.state.appliedFilterQuery}
              value={this.state.fliterQuery}
              changedText={text => {
                this.changedText(text);
              }}
              applyFilter={() => {
                this.applyFilter();
              }}
              clearFilter={() => {
                this.clearFilter();
              }}
              sortBy={this.state.sortBy}
              showSortByModel={() => {
                this.showSortByModel();
              }}
            />
          </View> */}
          <Text>This is test</Text>
          {/* {this.state.source.length > 0 && (
            <Pdf
              source={this.state.source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link presse: ${uri}`);
              }}
              style={styles.pdf}
            />
          )} */}
          {/* <View style={{flex: 1}}>
            <FlatList
              data={listData}
              renderItem={({item}) => (
                <ListItem
                  data={item}
                  setDetails={details => {
                    this.showDetails(details);
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => {
                this.setState({
                  data: [],
                  page_no: 1,
                  isRefreshing: true,
                });
                this.clearFilter();
                this.sequentialCall();
              }}
              refreshing={this.state.isRefreshing}
              ListEmptyComponent={
                <View style={{flex: 1}}>
                  <Text>No Data to Display!.</Text>
                </View>
              }
            />
          </View> */}
        </View>
        {/* <ItemDetails
          isVisible={this.state.isVisible}
          closeModel={() => {
            this.closeModel();
          }}
          data={this.state.details}
        />
        <SortByFilter
          sortByModel={this.state.sortByModel}
          sortBy={this.state.sortBy}
          setSortByFilter={value => {
            this.setState({sortBy: value, sortByModel: false});
          }}
        /> */}
      </View>
    );
  }
}
