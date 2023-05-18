<template>
  <!--banner轮播-->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in imglist" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  props: ['imglist'],
  watch: {
    imglist: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          /* eslint-disable no-new */
          new Swiper('.swiper-container', {
            // direction: 'vertical',
            loop: true,

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true // 设置小原店面可以切换
            },
            autoplay: {
              delay: 4500,
              //  新版本的写法：目前是5版本
              pauseOnMouseEnter: true,
              // // 如果设置为true，当切换到最后一个slide时停止自动切换
              stopOnLastSlide: true,
              // // 用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
        // ----------------------------------------
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
