import init from '../../common/list';

const memberModule = init({
  name: 'member',
  listActivityTimeBucket: 1 * 60 * 60 * 1000,
  state: {
    filterMap: {
      /**
       * 每一项：
       * - type表示输入类型
       * - kind表示此过滤项对应的组件类别
       * - text 表示此项的中文描述
       * - value 是过滤项的值
       * - isEnum 表示是否为枚举值，如果是枚举值
       *  - enum，是枚举值的各个值：val表示值，text表示中文描述
       */
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
        text: '是否持有抱起卡',
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
        text: '注册时间区间',
        kind: 'datePicker'
      }
    },
    tableColumn: {
      show: [
        // 所有的可显示列，服务端渲染进来
        {
          label: '用户ID',
          prop: 'id',
          width: '70'
        },
        {
          label: '手机号',
          prop: 'mobile',
          width: '150'
        },
        {
          label: '昵称',
          prop: 'nickName',
          width: '150'
        },
        {
          label: '用户类型',
          prop: 'typeName'
        },
        {
          label: '性别',
          prop: 'sexName'
        },
        {
          label: '所属渠道',
          prop: 'shareOriginChannel'
        },
        {
          label: 'be shared by',
          prop: 'shareOriginUserId',
          width: '150'
        },
        {
          label: '注册时间',
          prop: 'createDatetimeStr',
          width: '160'
        },
        {
          label: 'isHave包期卡',
          prop: 'periodCardHoldFlag',
          width: '140'
        },
        {
          label: '身份证号',
          prop: 'idCardNo',
          width: '170'
        }
      ],
      extend: [
        {
          label: '实名认证情况：',
          prop: 'realNameAuthStatusName'
        },
        {
          label: '真实姓名：',
          prop: 'realName'
        },
        {
          label: '总押金：',
          prop: 'totalDeposit'
        },
        {
          label: '可用押金：',
          prop: 'usableDeposit'
        },
        {
          label: '冻结押金：',
          prop: 'freezedDeposit'
        },
        {
          label: '总额度：',
          prop: 'totalQuota'
        },
        {
          label: '可用额度：',
          prop: 'usableQuota'
        },
        {
          label: '冻结额度：',
          prop: 'freezedQuota'
        },
        {
          label: '被此用户邀请且注册的',
          prop: 'invitedUserRegisterNumber'
        }
      ]
    }
  }
});
export default memberModule;