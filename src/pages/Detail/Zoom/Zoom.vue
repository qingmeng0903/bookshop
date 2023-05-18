<template>
  <div class="spec-preview">
    <img :src="skuImageList[curIndex].imgUrl" />
    <div class="event" @mousemove="handler" ref="parsent"></div>
    <div class="big">
      <img :src="skuImageList[curIndex].imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'ZOOM',
  props: ['skuImageList'],
  data() {
    return {
      curIndex: 0
    }
  },
  mounted() {
    this.$bus.$on('getindex', (index) => {
      this.curIndex = index
    })
  },
  methods: {
    // 鼠标移动放大镜子
    handler(e) {
      // console.log(123)
      const mask = this.$refs.mask
      const parsent = this.$refs.parsent
      const big = this.$refs.big
      const max = parsent.offsetWidth - mask.offsetWidth
      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetWidth / 2

      if (left <= 0) left = 0
      if (left >= max) left = max
      if (top <= 0) top = 0
      if (top >= max) top = max

      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      // big.img.style.left = -2 * left + 'px'
      // big.img.style.top = -2 * top + 'px'
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background: wheat;
    // background-color: rgba(0, 255, 0, 0.3);
    opacity: 0.4;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
