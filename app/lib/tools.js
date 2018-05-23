export const permissionMerge = (a, b) => {
  const typea = typeof a;
  const typeb = typeof b;
  if (typea === typeb) {
    // 判断是否为同一类型
  } else {
    // 如果不是，判断其中一个是否有布尔值或对象
    if ((typea === 'Object' || typeb === 'Object') && (typea === 'Boolean' || typeb === 'Boolean')) {} else {
      throw new Error('不是有效的权限值类型');
    }
  }
}