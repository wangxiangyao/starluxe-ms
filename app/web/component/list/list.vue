<template>
  <div class="list">
    <div class="loading" v-if="isLoading">
      <loading />
    </div>
    <div class="afterLoading" v-else>
      <div class="content">
        <el-table
        :data="currentList"
        style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item v-for="extend in tableColumn.extend" :key="extend.prop" :label="extend.label">
                  <span>{{props.row[extend.prop]}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-for="column in tableColumn.show" :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :min-width="column.width ? column.width : cloumnDefaultStyle.width">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next, jumper"
          :page-size="1"
          :total="pageSum">
        </el-pagination>
      </div>
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
  import loading from '../loading/loading.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'list',
    components: {
      loading
    },
    props: {
      page: Number,
      pageSum: Number,
      list: Object,
      isLoading: Boolean,
      tableColumn: Object // 表格表头配置数组
    },
    data() {
      return {
        cloumnDefaultStyle: {
          width: 100
        },
        currentPage: this.page
      }
    },
    computed: {
      currentList() {
        if (this.isLoading) {
          return []
        } else {
          let arr = []
          for (let item of Object.values(this.list[this.page].item)) {
            arr.push(item)
          }
          return arr
        }
      }
    },
    updated(){
      // console.log(this.content.list[this.content.page]);
    },
    methods: {
      handleCurrentChange(page) {
        this.$emit('changePage', page)
      }
    }
  }
</script>
<style scoped>
  .list {
    height: 100%;
  }
  .loading {
    height: 100%;
  }
  .content {
    height: 100%;
    width: calc(100vw - var(--侧边宽度) - 40px);
  }
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
</style>
<style>
  .list .el-table {
    height: 100%;
  }
  .list .el-table__body-wrapper {
    height: calc(689px - 48px);
    overflow: auto;
  }
  .table-expand {
    display: flex;
    flex-wrap: wrap;
  }
  .table-expand label {
    color: var(--主题色);
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    flex: 0 0 25%;
    min-width: 120px;
  }
  .pagination-wrapper .number.active {
    color: var(--主题色);
  }
</style>


