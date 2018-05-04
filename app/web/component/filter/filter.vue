<template>
  <div class="filtration">
    我是过滤器
  </div>
</template>
<script type="text/babel">
  /**
    从对应store中引入过滤配置 下对应各个过滤配置引用 { filterProps: Object, config: Object }
    filterProps是组件的props设置，config是具体配置项设置：
      - 配置项名称，
      - 类型，
      - form类型，
      - 前置条件
        - 前置条件改变，不可更改当前条件到适当值，而是在当前条件设置提示
        - 当前条件改变，前置条件改动到合适位置
      - 是否枚举，
        - 枚举集合

   */

  export default {
    name: 'filtration'
  }
</script>
<style>

</style>

