'use strict';

import api from 'web/api';

import {
  LOGIN,
  STORE_BRANDS,
  STORE_ENUM
} from './mutation-type';
import axios from 'axios';

const actions = {
  LOGIN(data) {
    // 向后端发起请求，请求登陆
  },
  getBrands({ commit }) {
    console.log('请求品牌');
    return api.getList('brands')
      .then((res) => {
        console.log('获得品牌列表', res);
        commit(STORE_BRANDS, res.data);
        const enumber = res.data.map((item) => {
          return {
            val: item.id,
            text: item.nameEn
          };
        });
        commit(STORE_ENUM, { enumber, key: 'brands' });
      });
  },
  getCommodityCategory({ commit }) {
    console.log('请求商品类别枚举字段');
    return api.getList('commodityCategory')
      .then((res) => {
        console.log('获得商品类别枚举', res);
        const enumber = res.data.map((item) => {
          return {
            val: item.id,
            text: item.name
          };
        });
        commit(STORE_ENUM, { enumber, key: 'commodityCategory' });
      });
  }
};

export default actions;
