<template>
  <div class="bottomControl">
    <!-- 未开发 -->
    <audio
      :src="musicUrl"
      controls
      autoplay
    ></audio>
  </div>
</template>

<script>
// 导入空白对象
import eventBus from '@/EventBus'

export default {
  data() {
    return {
      musicUrl: ''
    }
  },
  created() {
    eventBus.$on('send', url => {
      this.musicUrl = url
    })
  }
}
</script>

<style scoped>
.bottomControl {
  position: fixed; 
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 64px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: hsla(0,0%,100%,0.86);
}

.left-box {
  margin-left: 10vw;
}

.right-box {
  margin-right: 10vw;
}
</style>