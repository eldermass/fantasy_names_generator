<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { getName } from '@chenxuanyu/fantasy-names'
onLaunch(() => {
  console.log("App Launch");
  let a = getName(10)
  console.log(a)
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
</style>
