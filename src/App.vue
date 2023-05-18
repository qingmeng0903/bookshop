<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
    <my-footer v-show="$route.meta.show"></my-footer>
  </div>
</template>

<script>
import MyHeader from './components/Header/MyHeader.vue'
import MyFooter from './components/Footer/MyFooter.vue'
export default {
  mounted() {
    // 组件挂在完毕后触发actions拿数据 根组件只执行一次(性能优化) 之请求一次数据存放到全局仓库中
    this.$store.dispatch('getcate')
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style scoped lang="less"></style>
