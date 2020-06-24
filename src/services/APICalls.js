import axios from 'axios';

const apicall = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/',
  timeout: 20000,
});

export function axiosGet(url) {
  return apicall
    .get(url)
    .then(data => {
      //console.log('1', data);
      return data.data;
    })
    .catch(err => console.log(`===>Get Api Failed for ${url}`, err));
}
export function axiosGetCustomUrl(url) {
  return axios({
    url: url,
    method: 'GET',
    responseType: 'blob', // important
    headers: {
      Accept: 'application/pdf',
    },
    onDownloadProgress: function(progressEvent) {
      console.log(
        '===>Progress',
        (progressEvent.loaded * 100) / progressEvent.total,
      );
    },
  })
    .then(data => {
      //console.log('===>', data);
      return data.data;
    })
    .catch(err => console.log(`===>Get Api Failed for ${url}`, err));
}
