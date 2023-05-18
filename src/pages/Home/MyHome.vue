<template>
  <div>
    我是首页
    <!-- 三级联动全局组件 -->
    <type-nav></type-nav>
    <list-container></list-container>
    <today-recommend></today-recommend>
    <my-rank></my-rank>
    <my-like></my-like>
    <my-floor v-for="item in floorList" :key="item.id" :list="item"></my-floor>
    <my-brand></my-brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import TodayRecommend from './TodayRecommend/TodayRecommend.vue'
import MyRank from './MyRank/MyRank.vue'
import MyLike from './MyLike/MyLike.vue'
import MyFloor from './MyFloor/MyFloor.vue'
import MyBrand from './MyBrand/MyBrand.vue'
import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  mounted() {
    // 获取floor组件里的信息
    this.$store.dispatch('getFloorList')
    // 获取用户信息在登录成功之后展示
    // this.$store.dispatch('getUserInfo')
  },
  components: {
    ListContainer,
    TodayRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.foolList
    })
  }
}
</script>

<style scoped lang="less"></style>
