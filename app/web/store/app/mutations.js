'use strict';

import * as TYPE from './mutation-type';

const mutations = {
  [TYPE.STORE_TOKEN](state, token) {
    state.token = token;
  },
  [TYPE.STORE_USER](state, user) {
    state.user = user;
  }
};
export default mutations;
