<template>
  <!-- ---------------- -->
  <!-- 分页器 -->
  <!--  <pagi-nation :total="total"
          :currentpage="searchParams.pageNo"
          :pagesize="searchParams.pageSize"
          :continuous="5"
          @getPageInfo="getPageInfo">
          </pagi-nation> -->

  <!-- props: ['currentpage', 'total', 'pagesize', 'continuous'], -->

  <!-- -------------------- -->
  <div class="pagination">
    <button :disabled="currentpage == 1" @click="$emit('getPageInfo', currentpage - 1)">上一页</button>
    <button v-show="startAndend.start > 1" @click="$emit('getPageInfo', 1)" :class="{ active: currentpage == 1 }">1</button>
    <button v-if="startAndend.start > 2">···</button>

    <button
      :class="{ active: currentpage == item }"
      v-for="(item, index) in startAndend.end"
      :key="index"
      v-show="item > startAndend.start - 1"
      @click="$emit('getPageInfo', item)"
    >
      {{ item }}
    </button>

    <button v-if="startAndend.start < totalpage - continuous">···</button>
    <button v-if="startAndend.end < totalpage" @click="$emit('getPageInfo', totalpage)">{{ totalpage }}</button>
    <button :disabled="currentpage == totalpage" @click="$emit('getPageInfo', currentpage + 1)">下一页</button>
    <button>共{{ totalpage }} 页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'PagiNation',
  props: ['currentpage', 'total', 'pagesize', 'continuous'],
  computed: {
    // 总页码 =  total / pagesize
    totalpage() {
      return Math.ceil(this.total / this.pagesize)
    },
    startAndend() {
      let start = 0
      let end = 0

      const { currentpage, continuous, totalpage } = this
      // 特殊情况:总页数小于连续页码数
      if (totalpage < continuous) {
        start = 1
        end = totalpage
      } else {
        // 正常情况：总页数大于连续页码数
        // 3 4 5 6 7
        start = currentpage - parseInt(continuous / 2)
        end = currentpage + parseInt(continuous / 2)
        // 约束头部
        if (start < 1) {
          start = 1
          end = continuous
        }
        // 约束尾部
        if (end > totalpage) {
          start = totalpage - continuous + 1
          end = totalpage
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
