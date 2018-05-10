export const deepCopy = (origin) => {
  // 当前是无限拷贝
  // TODO: 加入控制层级的参数，默认值为0
  let data;
  if (typeof origin === 'object') {
    if (Array.isArray(origin)) {
      data = [];
      for (let i = 0, len = origin.length; i < len; i++) {
        data[i] = deepCopy(origin[i]);
      }
    } else {
      data = {};
      for (const [key, value] of Object.entries(origin)) {
        data[key] = deepCopy(value);
      }
    }
  } else {
    data = origin;
  }
  return data;
};
