<template>
  <view class="content">
    <view class="grid-container">
      <uni-grid :column="6" borderColor="#a9cecf" @change="handleTouch">
        <uni-grid-item v-for="(item, index) in list" :index="index" :key="item.value">
          <view :class="select === item.value ? 'grid-item-box grid-item-box-active' : 'grid-item-box'">
            <text class="text">{{ item.label }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
      <condition-panel :tab-key="select" />
      <result-panel />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type selectKey = (typeof list)[number]['value']

const list = [
  { value: 'name', label: '人名' },
  { value: 'dao', label: '法号' },
  { value: 'skill', label: '功法' },
  { value: 'book', label: '秘籍' },
  { value: 'creature', label: '生灵' },
  { value: 'material', label: '材料' },
  { value: 'alchemy', label: '丹药' },
  { value: 'talisman', label: '法宝' },
  { value: 'clan', label: '门派' },
  { value: 'nation', label: '国家' },
  { value: 'location', label: '据点' },
  { value: 'zone', label: '地域' },
] as const

// data
const select = ref<selectKey>('name')

// methods
const handleTouch = (e: { detail: { index: number }}) => {
  const item = list[e.detail.index]
  select.value = item.value
}

</script>
<script lang="ts">
import uniGrid from '../../components/uni-grid/uni-grid.vue'
import resultPanel from '../../view-components/result/result-panel.vue'
import conditionPanel from '../../view-components/conditions/conditions.vue'

export default {
  components: { uniGrid, resultPanel, conditionPanel },
}
</script>

<style lang="scss">
.content {
  height: 100vh;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(http://rgtezmpw4.hn-bkt.clouddn.com/bg.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;

  .grid-container {
    margin-top: 50rpx;
    text-align: center;
    width: 650rpx;
    .grid-item-box {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #444;
    }
    .grid-item-box-active {
      background: url(http://rgtezmpw4.hn-bkt.clouddn.com/1.png) no-repeat;
      background-size: 100% 100%;
      color: saddlebrown;
    }
  }
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
