'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import member from './modules/member/';

Vue.use(Vuex);

/* eslint-disable */
console.log('构建环境:', EASY_ENV_IS_DEV, EASY_ENV_IS_TEST, EASY_ENV_IS_PROD); // easywebpack 的全局变量

const host = EASY_ENV_IS_DEV ? 'http://127.0.0.1:7001' :
  EASY_ENV_IS_TEST ? 'http://127.0.0.1:7001' : 'http://127.0.0.1:7001';

const env = EASY_ENV_IS_DEV ? 'dev' :
  EASY_ENV_IS_TEST ? 'test' : 'prod';

/* eslint-enable */

/**
 * TODO: 全局反馈的数据流动设计（mask）
 * TODO: 权限地图
 */
const state = {
  token: '',
  host,
  env,
  user: {
    id: '',
    isLoading: false,
    needDestroy: false
  },
  mask: {
    isShow: false,
    type: '',
    message: '',
    all: ['login', 'error', 'success', 'hite', 'warning']
  },
  menu: {
    ready: false,
    item: []
  }
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    member
  }
});