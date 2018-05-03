import * as TYPE from './mutatison-type';

export default {
  namespaced: true,
  state() {
    return {
      member: {
        avatar: '',
        username: ''
      },
    };
  },
  actions: {},
  mutations: {
    [TYPE.STORE_MEMBER]() {}
  }
};
