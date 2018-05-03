'use strict';

import * as TYPE from './mutation-type';

const mutations = {
  [TYPE.STORE_TOKEN](state, token) {
    state.token = token;
  },
  [TYPE.STORE_USER](state, user) {
    state.user = user;
  },
  [TYPE.SHOW_MASK](state, data) {
    const { mask } = state;
    const type = data.type.toLowerCase();
    const isOk = mask.all.some((item) => {
      return item === type;
    });
    if (isOk) {
      mask.isShow = true;
      mask.type = type;
      console.log('展示mask:', type);
      /**
       *  switch type: login
       */
    } else {
      mask.isShow = true;
      mask.type = 'error';
      mask.message = '不存在的mask类型';
    }
  }
};
export default mutations;
