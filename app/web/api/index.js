import axios from 'axios';
// TODO: 这里要从store里边获取到token
// 暂时先这样手写
axios.defaults.baseURL = '/api/v1';
axios.defaults.headers.common.Authorization = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiY3JlYXRlZF9kYXRlIjoxNTI1MzQzMjU3OTgxLCJleHAiOjE1Mjc5MzUyNTcsImp0aSI6MX0.b2ByF97pxczqei3VDILNzcDvwTWzYWLTX7NuvKV1HYsjsPJ8aMfj5rdal3RllPjPKhQT5oEa8FcpypYpJJwyTw';

export default {
  getMemberList(config) {
    return axios.get('/user', {
      params: {
        ...config
      }
    });
  }
};
