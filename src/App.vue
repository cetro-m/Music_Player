<template>
  <div id="app">
    <!-- 导航栏 -->
    <layout-header></layout-header>
    <!-- 内容区域 -->
    <layout-main></layout-main>
    <!-- 播放栏 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutHeader from "./layout/header.vue"
import LayoutMain from "./layout/main.vue"
import LayoutFooter from "./layout/footer.vue"
export default {
  name: "app",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutFooter
  }
}
</script>

<style>
</style>