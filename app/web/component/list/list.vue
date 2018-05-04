<template>
  <div class="list-wrapper">
    <div class="loading" v-if="isLoading">
      加载中。。。
    </div>
    <div class="list" v-else>
      {{list}}
    </div>
  </div>
</template>
<script type="text/babel">
  /**
   * 局部mask
   *  - 展示loading
   * 列表
   * 分页
   */

  export default {
    name: 'list',
    props: {
      page: Number,
      pageSum: Number,
      list: Object,
      isLoading: Boolean
    },
    computed: {
    },
    updated(){
      // console.log(this.content.list[this.content.page]);
    },
    methods: {

    }
  }
</script>
<style scoped>
 
</style>

