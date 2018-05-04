import * as TYPE from './mutatison-type';
import api from 'web/api';

// 各个部分的数据有效时间
const MEMBER_LIST_ACTIVITY_TIME_BUCKET = 1 * 60 * 60 * 1000;
/**
 * 销毁级别码：
 * 0：memberList级别
 * 1：page级别
 * 2：member级别
 */

export default {
  namespaced: true,
  state() {
    return {
      /**
       * 策略：以页为单位，记录所有存储的项的id到all中。
       *  - 查询条件不变
       *    - 当请求某一页，判断数据是否需要被销毁（needDestroy）
       *      - 如果是，清空byPage all amount pageSum page next pre。
       *      - 否，判断byPage中是否有此页，如果没有，重新向后端请求此页。
       *  - 查询条件改变
       *    - 设置需要销毁
       */
      byPage: {},
      all: [],
      amount: 0,
      limit: 10,
      pageSum: 0,
      page: 1,
      next: 2,
      pre: 1,
      isLoading: false,
      needDestroy: false,
      lastUpdate: 0,
      remind: {
        // TODO: 局部的消息提示，这一块再设计一下,暂时用不到
        type: '',
        message: '',
      },
      filterMap: {
        userId: {
          type: 'String',
          value: '',
          text: 'id',
          isEnum: false,
          kind: 'input'
        },
        nickName: {
          type: 'String',
          value: '',
          text: '昵称',
          isEnum: false,
          kind: 'input'
        },
        sex: {
          type: 'String',
          value: '',
          text: '性别',
          isEnum: true,
          enum: [
            {
              val: 'MALE',
              text: '男'
            }, {
              val: 'FEMALE',
              text: '女'
            }
          ],
          kind: 'radio'
        },
        mobile: {
          type: 'String',
          value: '',
          text: '电话',
          isEnum: false,
          kind: 'input'
        },
        realName: {
          type: 'String',
          value: '',
          text: '真实姓名',
          isEnum: false,
          kind: 'input'
        },
        shareOriginChannel: {
          type: 'String',
          value: '',
          text: '所属渠道',
          isEnum: false,
          kind: 'input'
        },
        realNameAuthStatus: {
          type: 'String',
          value: '',
          text: '实名认证情况',
          isEnum: true,
          enum: [
            {
              val: 'NO_AUTH',
              text: '未认证'
            }, {
              val: 'IN_AUTH',
              text: '认证中'
            }, {
              val: 'AUTH_SUCCESS',
              text: '认证成功'
            }, {
              val: 'AUTH_FAIL',
              text: '认证失败'
            }
          ],
          kind: 'select'
        },
        type: {
          type: 'String',
          value: '',
          text: '会员类型',
          isEnum: true,
          enum: [
            {
              val: 'COMMON',
              text: '普通会员'
            }, {
              val: 'EXPERIENCE',
              text: '体验卡会员'
            }, {
              val: 'TWO_STAR',
              text: '双星卡会员'
            }, {
              val: 'FOUR_STAR',
              text: '四星卡会员'
            }, {
              val: 'SIX_STAR',
              text: '六星卡会员'
            }
          ],
          kind: 'select'
        },
        periodCardHoldFlag: {
          type: 'String',
          value: '',
          text: '',
          isEnum: true,
          enum: [
            {
              val: 'YES',
              text: '持有'
            },
            {
              val: 'NO',
              text: '未持有'
            }
          ],
          kind: 'radio'
        },
        registerTime: {
          type: 'Array',
          value: [],
          isEnum: false,
          kind: 'datePicker'
        }
      }
    };
  },
  getters: {
    filterConfig: state => {
      return JSON.parse(JSON.stringify(state.filterMap));
    },
    pureFilterConfig: state => {
      // 纯过滤配置，用于传给后端
      const c = {};
      for (const [key, value] of Object.entries(state.filterMap)) {
        if (value.value !== '' || value.value.length !== 0) {
          c[key] = value.value;
        }
      }
      return c;
    }
  },
  actions: {
    getMembersIfNeed({ state, dispatch, commit }) {
      // 根据缓存情况，判断是否请求数据
      if (dispatch('isNeedDestroy', { type: 1, page: state.page })) {
        dispatch('getMembers');
      }
    },
    getMembers({ state, getters, commit }) {
      console.log('请求members');
      const { pureFilterConfig } = getters;
      const { page, limit } = state;

      commit(TYPE.LOADING, { type: 0 });
      api.getMemberList({
        ...pureFilterConfig,
        page,
        limit
      })
        .then(res => {
          console.log('成功:', res);
          if (res.status === 200) {
            commit(TYPE.STORE_MEMBER, res.data);
            console.log(state.byPage[state.page]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    isNeedDestroy({ state, commit }, level = { type: 0 }) {
      /**
       * level: 表示要检查销毁标志的层级。all表示最外层，默认为true
       *  - 0: all: Boolean
       *  - 1: { page }
       *  - 2: { page, id }
       *        * currentType: 函数递归时候使用的标志量，不需要外部传递
       */
      /**
       * 1. 首先，判断module级别的销毁标志
       *  - 若不销毁，判断是否超过活性期间
       *    - 若不超过，检查level级别，判断是否深入检查
       *      - 若是：重复以上步骤
       *      - 若否，返回False
       *    - 若超过，派发对应销毁mutation，返回True
       *  - 若销毁，返回True
       */
      const now = +new Date();

      // 循环变量
      let ctx = state; // 当前级别的module
      let currentType = 0;
      for (; ;) {
        const { needDestroy, lastUpdate } = ctx;
        if (!needDestroy) {
          if (now < lastUpdate + MEMBER_LIST_ACTIVITY_TIME_BUCKET) {
            currentType++;
            if (currentType <= level.type) {
              // 这里，如果有特殊之处，需要手动改
              if (level.type === 1) {
                ctx = state.byPage[level.page];
              }
              if (level.type === 2) {
                ctx = ctx.byPage[level.page][level.id];
              }
              continue;
            } else {
              console.log('不需要销毁');
              return false;
            }
          } else {
            // 如果数据超期，不具有活性
            commit(TYPE.DESTORY, {
              type: 0
            });
            console.log('数据超过活性期限，销毁');
            return true;
          }
        } else {
          console.log('销毁标记为true, 销毁');
          return true;
        }
      }
    }
  },
  mutations: {
    [TYPE.STORE_MEMBER](state, { count, list }) {
      const { byPage, page } = state;
      const result = normalise(list, 'id');
      // 为每一页，添加 是否销毁，isLoading，lastUpdate
      byPage[page] = {
        item: result.data,
        isLoading: false,
        needDestroy: false,
        lastUpdate: +new Date(),
      };
      result.all.forEach((item) => {
        if (!state.all.includes(item)) {
          state.all.push(item);
        }
      });
      state.amount = count;
      state.needDestroy = false;
      state.isLoading = false;
      state.lastUpdate = +new Date();
    },
    [TYPE.CHANGE_PAGE](state, page) {
      let next = page + 1;
      let pre = page - 1;
      // 虽然再界面上，会做上一页，下一页的置灰处理，但是数据也要设置正确
      if (next > state.count) {
        next = state.count;
      }
      if (pre < 1) {
        pre = 1;
      }
      state.page = page;
      state.next = next;
      state.pre = pre;
    },
    [TYPE.DESTORY](state, what) {
      /**
       * what: 销毁那一部分数据
       *  - @type: 0
       *  - @type: 1
       *    - @page: '要销毁的页码'
       *  - @type: 2
       *    - @id: '要销毁的member的id'，
       *    - @page: '此member所在page'
       */
      const { type } = what;
      switch (type) {
        case 0:
          state.byPage = {};
          state.all = [];
          state.page = 1;
          state.next = 2;
          state.pre = 1;
          break;
        case 1:
          state.byPage[what.page].forEach((item) => {
            state.all.splice(state.all.includes(item), 1);
          });
          delete state.byPage[what.page];
          break;
        case 2:
          delete state.byPage[what.page][what.id];
          state.all.splice(state.all.includes(what.id));
          break;
        default:
          throw new Error('不存在的销毁类型。');
      }
    },
    [TYPE.LOADING](state, what) {
      // 规则同上
      const { type } = what;
      switch (type) {
        case 0:
          state.isLoading = true;
          break;
        case 1:
          state.byPage[what.page].isLoading = true;
          break;
        case 2:
          state.byPage[what.page][what.id].isLoading = true;
          break;
        default:
          throw new Error('不存在的loading类型。');
      }
    }
  }
};

function normalise(arr, by) {
  /**
   * @by: 根据arr中项的哪一个字段范式化
   * @arr: 数据数组
   *  - 如果没有by字段，报错
   *  - 如果有by：
   *    将by保存进数据
   * 对每一个有效项：应添加 是否销毁，isLoading，hasMore，lastUpdate
   * 确保数据的唯一性，不会有重复数据存在
   */
  const obj = {};
  const all = [];
  arr.forEach((item) => {
    if (item.hasOwnProperty('id')) {
      const id = item.id;
      if (!all.includes(id)) {
        // 添加额外状态项
        obj[item.id] = {
          ...item,
          hasMore: true,
          isLoading: false,
          needDestroy: false,
          lastUpdate: +new Date(),
        };
        all.push(id);
      }
    } else {
      throw new Error('范式化的数据，没有id，无法执行范式化');
    }
  });
  return {
    data: obj,
    all
  };
}