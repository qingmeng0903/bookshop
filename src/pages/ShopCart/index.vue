<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked == 1" @change="updateChecked(item, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 修改商品数量按钮 -->
            <!-- <a href="javascript:void(0)" class="mins" :disabled="item.skuNum == 1" @click="handler('mins', -1, item)">-</a> -->
            <button class="mins" :disabled="item.skuNum == 1" @click="handler('mins', -1, item)">-</button>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="handler('change', $event.target.value * 1, item)" />
            <button class="plus" @click="handler('add', 1, item)">+</button>
            <!-- <a href="javascript:void(0)" class="plus" @click="handler('add', 1, item)">+</a> -->
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="removeGoodscat(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllchecked && cartInfoList.length > 0" @click="addAllchecked($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="removeAllchecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>110</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" >结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引如lodash中节流
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getgoodscat')
    },
    // 修改商品数量
    handler: throttle(async function (type, disNum, item) {
      // 派发getaddGoodsCat 正数表示添加 负数表示减掉 0表示不变
      // this.$store.dispatch('getaddGoodsCat', { skuId: skuId, skuNum: skuNum })
      // switch 分情况
      switch (type) {
        case 'add':
          disNum = 1
          break
        case 'mins':
          disNum = item.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // 非法情况 小于0 || 汉字
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - item.skuNum
          }
          break
      }
      try {
        await this.$store.dispatch('getaddGoodsCat', { skuId: item.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {}
    }, 1600),
    // 删除购物车里面信息
    async removeGoodscat(id) {
      try {
        await this.$store.dispatch('getDeleteGoodscar', id)
        this.getData()
      } catch (error) {
        // alert(error.message)
        alert(error.message)
      }
    },

    // 配发修改复选框当中选中状态 商品选中状态 0代表取消选中 1代表选中  { skuId, isChecked }
    async updateChecked(item, event) {
      // console.log(event.target.checked)
      // let isChecked = event.target.checked === true ? 1 : 0
      // this.$store.dispatch('getUpdateChecked', { skuId: item.skuId, isChecked: isChecked })
      // // -------
      try {
        const isChecked = event.target.checked === true ? 1 : 0
        await this.$store.dispatch('getUpdateChecked', { skuId: item.skuId, isChecked: isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有选中的复选框商品
    removeAllchecked() {
      try {
        this.$store.dispatch('removeAllchecked')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      this.getData()
      this.getData()
    },
    // 全选按钮状态统一绑定 需要知道全选按钮的true和false 来号令群雄,节制所有的复选框
    async addAllchecked(evevt) {
      // console.log(event.target.checked)
      try {
        const isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('addAllchecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['goodscatList']),
    cartInfoList() {
      return this.goodscatList.cartInfoList || []
    },
    // 总价
    totalPrice() {
      let num = 0
      this.cartInfoList.forEach((item) => {
        num += item.skuPrice * item.skuNum
      })
      return num
    },
    isAllchecked() {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
